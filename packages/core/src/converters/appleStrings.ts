import { type ExportParameter, isDeletedPhrase } from "hoshi-models";
import { serialPromises } from "../helpers";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";

const keyEscape = (input: string): string => input;
const valueEscape = (input: string | undefined): string => {
  if (!input) {
    return "";
  }
  // noinspection JSUnresolvedReference
  return input
    .replaceAll(/((?<!%)%(?:\d+\$)?)s/g, "$1@")
    .replaceAll(/"/g, '\\"')
    .replaceAll("\n", "\\n");
};

class AppleStringsConverter implements Converter {
  public constructor(private fileSystem: FileSystem) {}

  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return "strings";
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = this.fileSystem.pathJoin(param.outDir, "strings");
    await this.fileSystem.createDirIfNotExistAsync(baseDir);
    const contextPrefix = param.metadata.package.contextPrefix || param.metadata.project.contextPrefix || "";
    const contextKeys = contextPrefix ? Object.keys(param.metadata.context) : [];
    await serialPromises(
      param.languages.map(async (lang) => {
        const contextBuffer = contextKeys.map(
          (key) => `"${keyEscape(contextPrefix + key)}" = "${valueEscape(param.metadata.context[key])}";`,
        );
        const mainBuffer = param.keys
          .filter((key) => !contextPrefix || !key.startsWith(contextPrefix))
          .sort()
          .map((key) =>
            isDeletedPhrase(param.phrases[key])
              ? ""
              : `"${keyEscape(key)}" = "${valueEscape(param.phrases[key]?.translations[lang])}";`,
          )
          .filter((v) => v !== "");
        const buffer = [...contextBuffer, ...mainBuffer].join("\n");
        const filePath = this.fileSystem.pathJoin(baseDir, `${lang}.strings`);
        await this.fileSystem.writeFileAsync(filePath, buffer);
      }),
    );
  }
}

export default AppleStringsConverter;
