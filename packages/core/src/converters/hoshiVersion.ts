import type { ExportParameter } from "hoshi-models";
import * as YAML from "yaml";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";

class HoshiVersionConverter implements Converter {
  public constructor(private fileSystem: FileSystem) {}

  // eslint-disable-next-line class-methods-use
  getName(): string {
    return "hoshiVersion";
  }

  // eslint-disable-next-line class-methods-use
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = this.fileSystem.pathJoin(param.outDir, "hoshiVersion");
    await this.fileSystem.createDirIfNotExistAsync(baseDir);
    const phrases = param.keys.reduce(
      (prev, cur) => {
        const phrase = param.phrases[cur];
        const metadata = Object.keys(phrase.metadata).reduce(
          (mPrev, mCur) => {
            mPrev[`\$${mCur}`] = phrase.metadata[mCur];
            return mPrev;
          },
          {} as Record<string, string>,
        );
        prev[cur] = {
          ...metadata,
          ...phrase.translations,
        };
        return prev;
      },
      {} as Record<string, Record<string, string>>,
    );
    const contents = {
      type: "hoshi.version:1",
      metadata: {
        ...param.metadata.project,
        ...param.metadata.package,
        ...param.metadata.version,
        ...param.metadata.context,
      },
      phrases: phrases,
    };
    const buffer = YAML.stringify(contents);
    const filePath = this.fileSystem.pathJoin(baseDir, "version.yaml");
    await this.fileSystem.writeFileAsync(filePath, buffer);
  }
}

export default HoshiVersionConverter;
