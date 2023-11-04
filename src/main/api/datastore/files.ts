/* eslint-disable no-console */
import {
  convertFilePhrasesToPhrases,
  convertPhrasesToFilePhrases,
  EditableVersion,
  SmalledPackage,
  SmalledProject,
  Version,
} from '../../../models';
import ProjectFile from '../../../engine/src/projectFile';

class FilesDatastore {
  private projectFile: ProjectFile | undefined;

  async openProjectFileAsync(path: string): Promise<SmalledProject | undefined> {
    try {
      const projectFile = new ProjectFile(path);
      const projectHeader = await projectFile.readProjectHeaderAsync();
      const packages = await projectFile.listPackagesAsync();
      this.projectFile = projectFile;
      return {
        ...projectHeader,
        packages,
      };
    } catch (e) {
      console.error(e);
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
      console.error(e);
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
      console.error(e);
      return undefined;
    }
  }

  async fetchEditableVersionAsync(
    packageId: string,
    versionId: string,
    includeCurrentVersionInHistory: boolean = false,
  ): Promise<EditableVersion | undefined> {
    try {
      if (!this.projectFile) {
        return undefined;
      }
      const targetVersion = await this.projectFile.readVersionAsync(packageId, versionId);
      const versions = await this.projectFile.listVersionsToVersionAsync(packageId, versionId);
      const historyVersions = includeCurrentVersionInHistory ? versions : versions.slice(0, versions.length - 1);
      const fileHistoryPhrases = await this.projectFile.readHistoryMergedPhrasesAsync(packageId, historyVersions);
      if (historyVersions.length === 0) {
        return undefined;
      }
      const phrases = convertFilePhrasesToPhrases(targetVersion.phrases);
      const historyPhrases = convertFilePhrasesToPhrases(fileHistoryPhrases);
      const keys = [...new Set([...Object.keys(historyPhrases), ...Object.keys(phrases)])];
      const languages = [
        ...new Set([
          ...Object.values(historyPhrases).flatMap((p) => Object.keys(p.translations)),
          ...Object.values(phrases).flatMap((p) => Object.keys(p.translations)),
        ]),
      ];
      return {
        id: versionId,
        keys,
        languages,
        metadata: targetVersion.metadata,
        historyPhrases,
        phrases,
      };
    } catch (e) {
      console.error(e);
      return undefined;
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
      console.error(e);
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
}

export default FilesDatastore;
