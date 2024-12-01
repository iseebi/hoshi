import * as childProcess from "node:child_process";
import { promises as fs } from "node:fs";
import nodePath from "node:path";
import * as util from "node:util";
import type { Dirent, ExecResult, FileSystem, Platform, Stats } from "hoshi-core";

const exec = util.promisify(childProcess.exec);

export class FileSystemImpl implements FileSystem {
  public pathJoin(...paths: string[]): string {
    return nodePath.join(...paths);
  }

  public pathExtName(path: string): string {
    return nodePath.extname(path);
  }

  public dirname(path: string): string {
    return nodePath.dirname(path);
  }

  public basename(path: string, ext?: string): string {
    return nodePath.basename(path, ext);
  }

  public writeFileAsync(path: string, data: string): Promise<void> {
    return fs.writeFile(path, data);
  }

  public readFileAsync(path: string): Promise<string> {
    return fs.readFile(path, { encoding: "utf8" });
  }

  public async createDirIfNotExistAsync(dir: string): Promise<void> {
    const isExist = await (async (): Promise<boolean> => {
      try {
        await fs.access(dir);
        return true;
      } catch (e) {
        return false;
      }
    })();
    if (isExist) {
      return;
    }
    await fs.mkdir(dir, { recursive: true });
  }

  public mkdirAsync(dir: string): Promise<void> {
    return fs.mkdir(dir);
  }

  public statAsync(path: string): Promise<Stats> {
    return fs.stat(path);
  }

  public readdirAsync(path: string): Promise<Dirent[]> {
    return fs.readdir(path, { withFileTypes: true });
  }

  public unlinkAsync(path: string): Promise<void> {
    return fs.unlink(path);
  }
}

export class PlatformImpl implements Platform {
  public async execAsync(command: string, options: { cwd: string; encoding: string }): Promise<ExecResult> {
    return await exec(command, options);
  }

  public env(): Record<string, string | undefined> {
    return process.env;
  }
}
