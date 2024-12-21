import {
  type ContextRepository,
  type FileSystem,
  type PackagesRepository,
  type ProjectsRepository,
  type PublishRepository,
  type VersionsRepository,
  serialPromises,
} from "hoshi-core";
import { ProjectFileName, type Result, errorResult } from "hoshi-models";
import type { PublishParameter } from "../models";

const filteredPackages = (availablePackages: string[], specifiedPackages: string[]): string[] | undefined => {
  if (!specifiedPackages.length) {
    return availablePackages;
  }
  const filtered = specifiedPackages.map((v) => (availablePackages.find((fv) => fv === v) ? v : undefined));
  const isIncludedNotExists = filtered.find((v): boolean => {
    if (!v) {
      console.error(`package ${v} is not exists`);
      return true;
    }
    return false;
  });
  if (isIncludedNotExists) {
    return undefined;
  }
  return filtered as string[];
};

const filteredFormats = (
  packageFormats: string | undefined,
  parameterFormats: string | undefined,
  availableFormats: string[],
): string[] | undefined => {
  const formats = ((): string[] => {
    if (parameterFormats) {
      return parameterFormats.split(",");
    }
    if (packageFormats) {
      return packageFormats.split(",");
    }
    return availableFormats;
  })();
  if (formats.findIndex((v) => availableFormats.findIndex((af) => af === v) < 0) >= 0) {
    return undefined;
  }
  return formats;
};

class PublishUseCase {
  public constructor(
    private projectsRepository: ProjectsRepository,
    private packagesRepository: PackagesRepository,
    private versionsRepository: VersionsRepository,
    private publishRepository: PublishRepository,
    private contextRepository: ContextRepository,
    private fileSystem: FileSystem,
  ) {}

  async processPublishAsync(parameter: PublishParameter): Promise<Result<void, string>> {
    const { outDir } = parameter.options;

    const projectPath = parameter.options.project ?? parameter.context.project;
    if (!projectPath) {
      return errorResult("Project path is not defined");
    }

    // プロジェクトロード
    const project = await this.projectsRepository.openProjectAsync(
      this.fileSystem.pathJoin(projectPath, ProjectFileName),
    );
    if (!project) {
      return errorResult("Project not found");
    }

    // 出力先がパッケージでないことを確認する
    if (await this.packagesRepository.isPackageAsync(outDir)) {
      return errorResult("Output directory is package");
    }

    // 対象パッケージを取得する
    const packages = filteredPackages(project.packages, parameter.packages);
    if (!packages) {
      return errorResult("Package not found");
    }

    // コンテキスト読み込み
    const context = await this.contextRepository.fetchContextAsync(projectPath);

    const availableFormats = await this.publishRepository.availableFormatsAsync();

    try {
      await serialPromises(
        packages.map(async (packageName) => {
          const pkg = await this.packagesRepository.fetchPackageAsync(packageName);
          if (!pkg) {
            throw new Error(`Package ${packageName}: cannot get package detail`);
          }

          // 出力先のフォーマットを得る
          const formats = filteredFormats(pkg.metadata.formats, parameter.options.format, availableFormats);
          if (!formats) {
            throw new Error(`Package ${packageName}: specified invalid format`);
          }

          // ターゲットバージョンを確定させる
          const targetVersion = this.packagesRepository.lookupSpecifiedVersionFullName(pkg, parameter.options.version);
          if (!targetVersion) {
            throw new Error(`Package ${packageName}: version ${parameter.options.version} not found`);
          }

          // 指定されたバージョンまでのマージバージョンを作成する
          const editableVersion = await this.versionsRepository.fetchEditableVersionAsync(
            packageName,
            targetVersion,
            true,
          );
          if (editableVersion.status !== "success") {
            if (editableVersion.status === "error") {
              switch (editableVersion.error.type) {
                case "parseError": {
                  throw new Error(
                    `Package ${packageName}: ${editableVersion.error.file} ${editableVersion.error.message}`,
                  );
                }
                case "noPackage":
                  throw new Error(`Package ${packageName}: not found`);
                case "exception":
                  throw new Error(`Package ${packageName}: ${editableVersion.error.error.message}`);
                default:
                  throw new Error(`Package ${packageName}: load failed`);
              }
            }
            throw new Error(`Package ${packageName}: load failed`);
          }

          // フォーマットごとに出力を実行する
          const packageOutDir = this.fileSystem.pathJoin(outDir, packageName);
          await serialPromises(
            formats.map((format) =>
              this.publishRepository.publishAsync(
                format,
                editableVersion.data,
                pkg.metadata,
                project.metadata,
                context,
                packageOutDir,
              ),
            ),
          );
        }),
      );
    } catch (e) {
      if (e instanceof Error) {
        return errorResult(e.message);
      }
      return errorResult(`unknown error ${e}`);
    }

    return { status: "success", data: undefined };
  }
}

export default PublishUseCase;
