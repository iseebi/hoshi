import type { EditableVersion, FileLoadError, Result, Version } from "hoshi-models";
import type FilesDatastore from "../datastore/files";
declare class VersionsRepository {
    private filesDatastore;
    constructor(filesDatastore: FilesDatastore);
    fetchEditableVersionAsync(packageId: string, versionId: string, includeCurrentVersionInHistory?: boolean): Promise<Result<EditableVersion, FileLoadError>>;
    addNewVersionAsync(packageId: string, versionId: string): Promise<void>;
    updateVersionAsync(packageId: string, versionId: string, data: Version): Promise<void>;
    deleteVersionAsync(packageId: string, versionId: string): Promise<void>;
}
export default VersionsRepository;
