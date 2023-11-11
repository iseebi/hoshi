/* eslint-disable no-console */
import { PublishParameter } from '../models';
import {
  PackagesRepository,
  ProjectsRepository,
  PublishRepository,
  VersionsRepository,
} from '../../../engine/src/repositories';
import path from 'path';
import { ProjectFileName } from '../../../models/file';
import { serialPromises } from '../../../engine/src/helpers';

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
      return parameterFormats.split(',');
    }
    if (packageFormats) {
      return packageFormats.split(',');
    }
    return availableFormats;
  })();
  if (formats.findIndex((v) => availableFormats.findIndex((af) => af === v) < 0) >= 0) {
    return undefined;
  }
  return formats;
};

class PublishUseCase {
  private projectsRepository: ProjectsRepository;

  private packagesRepository: PackagesRepository;

  private versionsRepository: VersionsRepository;

  private publishRepository: PublishRepository;

  public constructor(
    projectsRepository: ProjectsRepository,
    packagesRepository: PackagesRepository,
    versionsRepository: VersionsRepository,
    publishRepository: PublishRepository,
  ) {
    this.projectsRepository = projectsRepository;
    this.packagesRepository = packagesRepository;
    this.versionsRepository = versionsRepository;
    this.publishRepository = publishRepository;
  }

  async processPublishAsync(parameter: PublishParameter): Promise<boolean> {
    const { project: projectPath, outDir } = parameter.options;

    // プロジェクトロード
    const project = await this.projectsRepository.openProjectAsync(path.join(projectPath, ProjectFileName));
    if (!project) {
      console.error('Specified invalid project');
      return false;
    }

    // 出力先がパッケージでないことを確認する
    if (await this.packagesRepository.isPackageAsync(outDir)) {
      console.error('Output directory is package');
      return false;
    }

    // 対象パッケージを取得する
    const packages = filteredPackages(project.packages, parameter.packages);
    if (!packages) {
      console.error('Package not found');
      return false;
    }

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
          if (!editableVersion) {
            throw new Error(`Package ${packageName}: load failed`);
          }

          // フォーマットごとに出力を実行する
          const packageOutDir = path.join(outDir, packageName);
          await serialPromises(
            formats.map((format) =>
              this.publishRepository.publishAsync(
                format,
                editableVersion,
                pkg.metadata,
                project.metadata,
                packageOutDir,
              ),
            ),
          );
        }),
      );
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }
}

export default PublishUseCase;
