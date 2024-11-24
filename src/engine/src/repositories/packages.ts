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

  async isExistAsync(packageId: string): Promise<boolean> {
    return this.filesDatastore.isPackageExistAsync(packageId);
  }

  async isPackageAsync(dir: string): Promise<boolean> {
    return this.filesDatastore.isPackageAsync(dir);
  }

  addNewPackageAsync(packageId: string): Promise<void> {
    return this.filesDatastore.addNewPackageAsync(packageId);
  }

  // eslint-disable-next-line class-methods-use-this
  lookupSpecifiedVersionFullName(pkg: SmalledPackage, version: string | undefined): string | undefined {
    if (pkg.versions.length === 0) {
      return undefined;
    }
    if (!version) {
      return pkg.versions[pkg.versions.length - 1];
    }
    return pkg.versions.find((ver) => {
      // 完全一致
      if (ver === version) {
        return true;
      }

      // ダメ文字フィルタ
      const normalizedSearchVersion = version.replace(/\//, '-');
      const versionTag = ((): string | undefined => {
        const m = ver.match(/^\d+_(.+)$/);
        return m ? m[1] : undefined;
      })();
      if (!versionTag) {
        return undefined;
      }

      // フレーズ一致
      return normalizedSearchVersion === versionTag || version === versionTag;
    });
  }
}

export default PackagesRepository;
