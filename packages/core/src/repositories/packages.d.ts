import type { SmalledPackage } from "hoshi-models";
import type FilesDatastore from "../datastore/files";
declare class PackagesRepository {
    private filesDatastore;
    constructor(filesDatastore: FilesDatastore);
    fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined>;
    isExistAsync(packageId: string): Promise<boolean>;
    isPackageAsync(dir: string): Promise<boolean>;
    addNewPackageAsync(packageId: string): Promise<void>;
    lookupSpecifiedVersionFullName(pkg: SmalledPackage, version: string | undefined): string | undefined;
}
export default PackagesRepository;
