import { SmalledPackage, SmalledProject } from '../../../models';
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
}

export default FilesDatastore;
