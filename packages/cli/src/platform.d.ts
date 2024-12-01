import type { Dirent, ExecResult, FileSystem, Platform, Stats } from "hoshi-core";
export declare class FileSystemImpl implements FileSystem {
    pathJoin(...paths: string[]): string;
    pathExtName(path: string): string;
    dirname(path: string): string;
    basename(path: string, ext?: string): string;
    writeFileAsync(path: string, data: string): Promise<void>;
    readFileAsync(path: string): Promise<string>;
    createDirIfNotExistAsync(dir: string): Promise<void>;
    mkdirAsync(dir: string): Promise<void>;
    statAsync(path: string): Promise<Stats>;
    readdirAsync(path: string): Promise<Dirent[]>;
    unlinkAsync(path: string): Promise<void>;
}
export declare class PlatformImpl implements Platform {
    execAsync(command: string, options: {
        cwd: string;
        encoding: string;
    }): Promise<ExecResult>;
    env(): Record<string, string | undefined>;
}
