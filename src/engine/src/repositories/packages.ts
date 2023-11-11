import { SmalledPackage } from '../../../models';
import FilesDatastore from '../datastore/files';

class PackagesRepository {
  private filesDatastore: FilesDatastore;

  public constructor(filesDatastore: FilesDatastore) {
    this.filesDatastore = filesDatastore;
  }

  fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined> {
    return this.filesDatastore.fetchPackageAsync(packageId);
  }

  addNewPackageAsync(packageId: string): Promise<void> {
    return this.filesDatastore.addNewPackageAsync(packageId);
  }
}

export default PackagesRepository;
