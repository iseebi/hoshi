import { SmalledProject } from '../../../models';
import FilesDatastore from '../datastore/files';

class ProjectsRepository {
  private filesDatastore: FilesDatastore;

  public constructor(filesDatastore: FilesDatastore) {
    this.filesDatastore = filesDatastore;
  }

  openProjectAsync(path: string): Promise<SmalledProject | undefined> {
    return this.filesDatastore.openProjectFileAsync(path);
  }

  fetchCurrentProjectAsync() {
    return this.filesDatastore.fetchCurrentProjectAsync();
  }
}
export default ProjectsRepository;
