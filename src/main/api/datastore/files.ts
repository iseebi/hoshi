import { SmalledProject } from '../../../models';
import ProjectFile from '../../../engine/src/projectFile';

class FilesDatastore {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
}

export default FilesDatastore;
