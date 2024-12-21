import {
  type FileHeader,
  PackageFileName,
  PackageFileType,
  type PackageHeader,
  ProjectFileName,
  ProjectFileType,
  type ProjectHeader,
  type VersionFile,
  VersionFileExt,
  VersionFileType,
} from "hoshi-models";
import * as YAML from "yaml";
import { YAMLParseError } from "yaml";
import type { Dirent, FileSystem } from "../platform";
import ProjectFileError from "./projectFileError";

class ProjectFile {
  private readonly projectDirectory: string;
  private readonly fileSystem: FileSystem;

  public constructor(projectFilePath: string, fileSystem: FileSystem) {
    this.projectDirectory = fileSystem.dirname(projectFilePath);
    this.fileSystem = fileSystem;
  }

  async readProjectHeaderAsync(): Promise<ProjectHeader> {
    const contents = await this.readYamlFileAsync<FileHeader & ProjectHeader>(ProjectFileName);
    if (contents.type !== ProjectFileType) {
      throw new ProjectFileError("Invalid project type", ProjectFileName);
    }
    return {
      id: contents.id,
      metadata: contents.metadata,
    };
  }

  async writeProjectHeaderAsync(header: FileHeader & ProjectHeader): Promise<void> {
    await this.writeYamlFileAsync(ProjectFileName, header);
  }

  async listPackagesAsync(): Promise<string[]> {
    const dirs = (await this.fileSystem.readdirAsync(this.projectDirectory))
      .filter((entry: Dirent) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry: Dirent) => entry.name);
    return (await Promise.all(dirs.map(async (dir: string) => [dir, await this.isPackageAsync(dir)]))).map(
      (v) => v[0] as string,
    );
  }

  async addNewPackageAsync(packageId: string): Promise<void> {
    const packages = await this.listPackagesAsync();
    if (packages.find((v) => v === packageId)) {
      throw new Error("Directory already exists");
    }
    await this.makeDirectoryAsync(packageId);
    await this.writePackageHeaderAsync(packageId, {
      id: "",
      metadata: {},
    });
  }

  async writePackageHeaderAsync(packageId: string, contents: PackageHeader): Promise<void> {
    const fileName = this.fileSystem.pathJoin(packageId, PackageFileName);
    await this.writeYamlFileAsync<FileHeader & Omit<PackageHeader, "id">>(fileName, {
      type: PackageFileType,
      metadata: contents.metadata,
    });
  }

  async readPackageHeaderAsync(packageId: string): Promise<PackageHeader> {
    const fileName = this.fileSystem.pathJoin(packageId, PackageFileName);
    const contents = await this.readYamlFileAsync<FileHeader & PackageHeader>(fileName);
    if (contents.type !== PackageFileType) {
      throw new ProjectFileError("Invalid package type", fileName);
    }
    return {
      id: packageId,
      metadata: contents.metadata,
    };
  }

  private async isPackageAsync(dirName: string): Promise<boolean> {
    try {
      const fileName = this.fileSystem.pathJoin(dirName, PackageFileName);
      const contents = await this.readYamlFileAsync<FileHeader>(fileName);
      return contents.type === PackageFileType;
    } catch {
      return false;
    }
  }

  async listVersionsAsync(packageId: string): Promise<string[]> {
    const packageDir = this.fileSystem.pathJoin(this.projectDirectory, packageId);
    const versions = (await this.fileSystem.readdirAsync(packageDir))
      .filter(
        (entry: Dirent) =>
          !entry.isDirectory() &&
          !entry.name.startsWith(".") &&
          this.fileSystem.pathExtName(entry.name).toLowerCase() === VersionFileExt,
      )
      .map((entry: Dirent) => this.fileSystem.basename(entry.name, VersionFileExt));
    return versions.sort();
  }

  async listVersionsToVersionAsync(packageId: string, versionId: string): Promise<string[]> {
    const versions = await this.listVersionsAsync(packageId);
    const index = versions.findIndex((v) => {
      if (versionId === v) {
        return true;
      }
      const match = v.match(/^\d+_(.*)$/);
      // noinspection RedundantIfStatementJS
      if (match && match[1] === v) {
        return true;
      }
      return false;
    });
    if (index < 0) {
      return [];
    }
    return versions.slice(0, index + 1);
  }

  async readVersionAsync(packageId: string, versionId: string): Promise<VersionFile> {
    const fileName = this.fileSystem.pathJoin(packageId, `${versionId}${VersionFileExt}`);
    const contents = await this.readYamlFileAsync<FileHeader & VersionFile>(fileName);
    if (contents.type !== VersionFileType) {
      throw new ProjectFileError("Invalid version type", fileName);
    }
    return {
      id: versionId,
      metadata: contents.metadata,
      phrases: contents.phrases,
    };
  }

  async readHistoryMergedPhrasesAsync(
    packageId: string,
    versionIds: string[],
  ): Promise<Record<string, Record<string, string>>> {
    const histories: VersionFile[] = await Promise.all(
      versionIds.map((versionId) => this.readVersionAsync(packageId, versionId)),
    );
    return histories.reduce(
      (prev, cur) => {
        const next = prev;
        for (const key of Object.keys(cur.phrases)) {
          if (!next[key]) {
            next[key] = cur.phrases[key];
            continue;
          }
          // 削除フラグだったら置き換え
          if (next[key].$deleted === "true") {
            next[key] = cur.phrases[key];
            continue;
          }
          if (cur.phrases[key].$deleted === "true") {
            next[key] = {
              $deleted: "true",
            };
            continue;
          }
          next[key] = { ...next[key], ...cur.phrases[key] };
        }
        return next;
      },
      {} as Record<string, Record<string, string>>,
    );
  }

  async writeVersionFileAsync(packageId: string, versionId: string, contents: VersionFile): Promise<void> {
    const fileName = this.fileSystem.pathJoin(packageId, `${versionId}${VersionFileExt}`);
    await this.writeYamlFileAsync<FileHeader & Omit<VersionFile, "id">>(fileName, {
      type: VersionFileType,
      metadata: contents.metadata,
      phrases: contents.phrases,
    });
  }

  async deleteVersionFileAsync(packageId: string, versionId: string): Promise<void> {
    const fileName = this.fileSystem.pathJoin(packageId, `${versionId}${VersionFileExt}`);
    await this.deleteFileAsync(fileName);
  }

  private async readYamlFileAsync<T>(relativeFileName: string): Promise<T> {
    try {
      const targetPath = this.fileSystem.pathJoin(this.projectDirectory, relativeFileName);
      const contents = await this.fileSystem.readFileAsync(targetPath);
      return YAML.parse(contents) as T;
    } catch (e) {
      if (e instanceof YAMLParseError) {
        throw new ProjectFileError(
          e.message,
          relativeFileName,
          e.linePos?.map((p) => ({ line: p.line, column: p.col })) ?? [],
        );
      }
      if (e instanceof Error) {
        throw new ProjectFileError(e.message, relativeFileName);
      }
      throw new ProjectFileError("Unknown error", relativeFileName);
    }
  }

  async writeYamlFileAsync<T>(relativeFileName: string, data: T): Promise<void> {
    const targetPath = this.fileSystem.pathJoin(this.projectDirectory, relativeFileName);
    const contents = YAML.stringify(data);
    await this.fileSystem.writeFileAsync(targetPath, contents);
  }

  private async deleteFileAsync(relativeFileName: string): Promise<void> {
    const targetPath = this.fileSystem.pathJoin(this.projectDirectory, relativeFileName);
    await this.fileSystem.unlinkAsync(targetPath);
  }

  private async makeDirectoryAsync(relativeFileName: string): Promise<void> {
    const targetPath = this.fileSystem.pathJoin(this.projectDirectory, relativeFileName);
    await this.fileSystem.mkdirAsync(targetPath);
  }
}

export default ProjectFile;
