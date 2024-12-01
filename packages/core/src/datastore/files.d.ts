import { type EditableVersion, type Result, type SmalledPackage, type SmalledProject, type Version } from "hoshi-models";
import { type FileLoadError, type ProjectCreateError } from "hoshi-models";
import type { FileSystem } from "../platform";
declare class FilesDatastore {
    private fileSystem;
    private projectFile;
    constructor(fileSystem: FileSystem);
    createProjectAsync(basePath: string, name: string): Promise<Result<void, ProjectCreateError>>;
    openProjectFileAsync(dir: string): Promise<SmalledProject | undefined>;
    fetchCurrentProjectAsync(): Promise<SmalledProject | undefined>;
    fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined>;
    addNewPackageAsync(packageId: string): Promise<void>;
    fetchEditableVersionAsync(packageId: string, versionId: string, includeCurrentVersionInHistory?: boolean): Promise<Result<EditableVersion, FileLoadError>>;
    addNewVersionAsync(packageId: string, versionId: string): Promise<void>;
    updateVersionAsync(packageId: string, versionId: string, data: Version): Promise<void>;
    deleteVersionAsync(packageId: string, versionId: string): Promise<void>;
    isPackageExistAsync(packageId: string): Promise<boolean>;
    isPackageAsync(dir: string): Promise<boolean>;
    isDirectoryExistsAsync(dir: string): Promise<boolean>;
}
export default FilesDatastore;
