import { Result, SmalledProject } from '../../../models';
import { ProjectCreateError } from '../../../models/file';
import FilesDatastore from '../datastore/files';

class ProjectsRepository {
  private filesDatastore: FilesDatastore;

  public constructor(filesDatastore: FilesDatastore) {
    this.filesDatastore = filesDatastore;
  }

  openProjectAsync(path: string): Promise<SmalledProject | undefined> {
    return this.filesDatastore.openProjectFileAsync(path);
  }

  fetchCurrentProjectAsync(): Promise<SmalledProject | undefined> {
    return this.filesDatastore.fetchCurrentProjectAsync();
  }

  createProjectAsync(path: string, name: string): Promise<Result<void, ProjectCreateError>> {
    return this.filesDatastore.createProjectAsync(path, name);
  }
}
export default ProjectsRepository;
