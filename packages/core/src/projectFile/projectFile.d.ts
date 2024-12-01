import { type FileHeader, type PackageHeader, type ProjectHeader, type VersionFile } from "hoshi-models";
import type { FileSystem } from "../platform";
declare class ProjectFile {
    private readonly projectDirectory;
    private readonly fileSystem;
    constructor(projectFilePath: string, fileSystem: FileSystem);
    readProjectHeaderAsync(): Promise<ProjectHeader>;
    writeProjectHeaderAsync(header: FileHeader & ProjectHeader): Promise<void>;
    listPackagesAsync(): Promise<string[]>;
    addNewPackageAsync(packageId: string): Promise<void>;
    writePackageHeaderAsync(packageId: string, contents: PackageHeader): Promise<void>;
    readPackageHeaderAsync(packageId: string): Promise<PackageHeader>;
    private isPackageAsync;
    listVersionsAsync(packageId: string): Promise<string[]>;
    listVersionsToVersionAsync(packageId: string, versionId: string): Promise<string[]>;
    readVersionAsync(packageId: string, versionId: string): Promise<VersionFile>;
    readHistoryMergedPhrasesAsync(packageId: string, versionIds: string[]): Promise<Record<string, Record<string, string>>>;
    writeVersionFileAsync(packageId: string, versionId: string, contents: VersionFile): Promise<void>;
    deleteVersionFileAsync(packageId: string, versionId: string): Promise<void>;
    private readYamlFileAsync;
    writeYamlFileAsync<T>(relativeFileName: string, data: T): Promise<void>;
    private deleteFileAsync;
    private makeDirectoryAsync;
}
export default ProjectFile;
