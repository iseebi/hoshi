import {
  type EditableVersion,
  type Result,
  type SmalledPackage,
  type SmalledProject,
  type Version,
  convertFilePhrasesToPhrases,
  convertPhrasesToFilePhrases,
  errorResult,
  successResult,
} from "hoshi-models";
import { type FileLoadError, PackageFileName, type ProjectCreateError, ProjectFileType } from "hoshi-models";
import type { FileSystem } from "../platform";
import { ProjectFile, ProjectFileError } from "../projectFile";

class FilesDatastore {
  private projectFile: ProjectFile | undefined;

  public constructor(private fileSystem: FileSystem) {}

  async createProjectAsync(basePath: string, name: string): Promise<Result<void, ProjectCreateError>> {
    try {
      const dir = this.fileSystem.pathJoin(basePath, name);
      if (await this.isDirectoryExistsAsync(dir)) {
        return errorResult({ type: "alreadyExists" });
      }

      await this.fileSystem.mkdirAsync(dir);

      const projectFile = new ProjectFile(dir, this.fileSystem);
      await projectFile.writeProjectHeaderAsync({
        type: ProjectFileType,
        id: name,
        metadata: {},
      });

      return successResult(undefined);
    } catch (e) {
      if (e instanceof Error) {
        return errorResult({ type: "exception", error: e });
      }
      return errorResult({ type: "unknown" });
    }
  }

  async openProjectFileAsync(dir: string): Promise<SmalledProject | undefined> {
    try {
      const projectFile = new ProjectFile(dir, this.fileSystem);
      const projectHeader = await projectFile.readProjectHeaderAsync();
      const packages = await projectFile.listPackagesAsync();
      this.projectFile = projectFile;
      return {
        ...projectHeader,
        packages,
      };
    } catch (e) {
      // console.error(e);
      return undefined;
    }
  }

  async fetchCurrentProjectAsync(): Promise<SmalledProject | undefined> {
    try {
      if (!this.projectFile) {
        return undefined;
      }
      const projectHeader = await this.projectFile.readProjectHeaderAsync();
      const packages = await this.projectFile.listPackagesAsync();
      return {
        ...projectHeader,
        packages,
      };
    } catch (e) {
      // console.error(e);
      return undefined;
    }
  }

  async fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined> {
    try {
      if (!this.projectFile) {
        return undefined;
      }
      const packageHeader = await this.projectFile.readPackageHeaderAsync(packageId);
      const versions = await this.projectFile.listVersionsAsync(packageId);
      return {
        ...packageHeader,
        versions,
      };
    } catch (e) {
      // console.error(e);
      return undefined;
    }
  }

  async addNewPackageAsync(packageId: string): Promise<void> {
    try {
      if (!this.projectFile) {
        return;
      }
      await this.projectFile.addNewPackageAsync(packageId);
    } catch (e) {
      // console.error(e);
    }
  }

  async fetchEditableVersionAsync(
    packageId: string,
    versionId: string,
    includeCurrentVersionInHistory = false,
  ): Promise<Result<EditableVersion, FileLoadError>> {
    try {
      if (!this.projectFile) {
        return errorResult({ type: "noPackage" });
      }
      const targetVersion = await this.projectFile.readVersionAsync(packageId, versionId);
      const versions = await this.projectFile.listVersionsToVersionAsync(packageId, versionId);
      const historyVersions = includeCurrentVersionInHistory ? versions : versions.slice(0, versions.length - 1);
      const fileHistoryPhrases = await this.projectFile.readHistoryMergedPhrasesAsync(packageId, historyVersions);
      const phrases = convertFilePhrasesToPhrases(targetVersion.phrases);
      const historyPhrases = convertFilePhrasesToPhrases(fileHistoryPhrases);
      const keys = [...new Set([...Object.keys(historyPhrases), ...Object.keys(phrases)])];
      const languages = [
        ...new Set([
          ...Object.values(historyPhrases).flatMap((p) => Object.keys(p.translations)),
          ...Object.values(phrases).flatMap((p) => Object.keys(p.translations)),
        ]),
      ];
      return successResult({
        id: versionId,
        keys,
        languages,
        metadata: targetVersion.metadata,
        historyPhrases,
        phrases,
      });
    } catch (e) {
      if (e instanceof ProjectFileError) {
        return errorResult({
          type: "parseError",
          message: e.message,
          file: e.fileName,
          positions: e.positions,
        });
      }
      if (e instanceof Error) {
        return errorResult({ type: "exception", error: e });
      }
      return errorResult({ type: "unknown" });
    }
  }

  async addNewVersionAsync(packageId: string, versionId: string): Promise<void> {
    try {
      if (!this.projectFile) {
        return;
      }
      await this.projectFile.writeVersionFileAsync(packageId, versionId, {
        id: versionId,
        metadata: {},
        phrases: {},
      });
    } catch (e) {
      console.error(e);
    }
  }

  async updateVersionAsync(packageId: string, versionId: string, data: Version): Promise<void> {
    try {
      if (!this.projectFile) {
        return;
      }
      await this.projectFile.writeVersionFileAsync(packageId, versionId, {
        id: versionId,
        metadata: data.metadata,
        phrases: convertPhrasesToFilePhrases(data.phrases),
      });
    } catch (e) {
      // console.error(e);
    }
  }

  async deleteVersionAsync(packageId: string, versionId: string): Promise<void> {
    try {
      if (!this.projectFile) {
        return;
      }
      await this.projectFile.deleteVersionFileAsync(packageId, versionId);
    } catch (e) {
      console.error(e);
    }
  }

  async isPackageExistAsync(packageId: string): Promise<boolean> {
    try {
      if (!this.projectFile) {
        return false;
      }
      const packages = await this.projectFile.listPackagesAsync();
      return packages.includes(packageId);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async isPackageAsync(dir: string): Promise<boolean> {
    try {
      const dirResult = await this.fileSystem.statAsync(dir);
      if (!dirResult.isDirectory()) {
        return false;
      }
      const metadataPath = this.fileSystem.pathJoin(dir, PackageFileName);
      const metadataResult = await this.fileSystem.statAsync(metadataPath);
      return metadataResult.isFile();
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async isDirectoryExistsAsync(dir: string): Promise<boolean> {
    try {
      const dirResult = await this.fileSystem.statAsync(dir);
      return dirResult.isDirectory();
    } catch (e) {
      return false;
    }
  }
}

export default FilesDatastore;
