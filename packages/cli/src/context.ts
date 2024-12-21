import { promises as fs } from "node:fs";
import path from "node:path";
import { type Result, errorResult, successResult } from "hoshi-models";
import type { CommandContext } from "./models";

const fileExistAtDir = async (dir: string, file: string): Promise<boolean> => {
  try {
    const fileDir = path.join(dir, file);
    const result = await fs.stat(fileDir);
    return result.isFile();
  } catch (e) {
    if ((e as NodeJS.ErrnoException)?.code === "ENOENT") {
      return false;
    }
    throw e;
  }
};

const detectContext = async (): Promise<Result<CommandContext, Error>> => {
  try {
    // カレントディレクトリを得る
    const cwd = process.cwd();

    // カレントディレクトリのreal pathを得る
    const realCwd = await fs.realpath(cwd);

    // カレントディレクトリにpackage.hoshiがあれば、それはpackage context
    if (await fileExistAtDir(realCwd, "package.hoshi")) {
      return successResult({
        project: path.dirname(realCwd),
        package: path.basename(realCwd),
      });
    }

    // カレントディレクトリにproject.hoshiがあれば、それはproject context
    if (await fileExistAtDir(realCwd, "project.hoshi")) {
      return successResult({ project: realCwd, package: undefined });
    }
  } catch (e) {
    return errorResult(e as Error);
  }

  return successResult({ project: undefined, package: undefined });
};

export default detectContext;
