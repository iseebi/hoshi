import FilesDatastore from '../datastore/files';
import { EditableVersion, Result, Version } from '../../../models';
import { FileLoadError } from '../../../models/file';

class VersionsRepository {
  private filesDatastore: FilesDatastore;

  public constructor(filesDatastore: FilesDatastore) {
    this.filesDatastore = filesDatastore;
  }

  fetchEditableVersionAsync(
    packageId: string,
    versionId: string,
    includeCurrentVersionInHistory: boolean = false,
  ): Promise<Result<EditableVersion, FileLoadError>> {
    return this.filesDatastore.fetchEditableVersionAsync(packageId, versionId, includeCurrentVersionInHistory);
  }

  addNewVersionAsync(packageId: string, versionId: string): Promise<void> {
    return this.filesDatastore.addNewVersionAsync(packageId, versionId);
  }

  updateVersionAsync(packageId: string, versionId: string, data: Version): Promise<void> {
    return this.filesDatastore.updateVersionAsync(packageId, versionId, data);
  }

  deleteVersionAsync(packageId: string, versionId: string): Promise<void> {
    return this.filesDatastore.deleteVersionAsync(packageId, versionId);
  }
}

export default VersionsRepository;
