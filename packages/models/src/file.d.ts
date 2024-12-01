export declare const ProjectFileType = "hoshi.project:1";
export declare const PackageFileType = "hoshi.package:1";
export declare const VersionFileType = "hoshi.version:1";
export declare const AppFileExt = ".hoshi";
export declare const VersionFileExt = ".yaml";
export declare const ProjectFileName = "project.hoshi";
export declare const PackageFileName = "package.hoshi";
export type FileHeader = {
    type: string;
};
export type FileLoadError = {
    type: "parseError";
    message: string;
    file?: string;
    positions: {
        line: number;
        column: number;
    }[];
} | {
    type: "noPackage";
} | {
    type: "exception";
    error: Error;
} | {
    type: "unknown";
};
export type ProjectCreateError = {
    type: "alreadyExists";
} | {
    type: "exception";
    error: Error;
} | {
    type: "unknown";
};
