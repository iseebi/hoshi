import { type ExportParameter, isDeletedPhrase } from "hoshi-models";
import { serialPromises } from "../helpers";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";

const keyEscape = (input: string): string => input;
export const valueEscape = (input: string | undefined): string => input ?? "";

// noinspection DuplicatedCode
class JsonConverter implements Converter {
  public constructor(private fileSystem: FileSystem) {}

  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return "json";
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = this.fileSystem.pathJoin(param.outDir, "json");
    await this.fileSystem.createDirIfNotExistAsync(baseDir);
    const contextPrefix = param.metadata.package.contextPrefix || param.metadata.project.contextPrefix || "";
    const contextKeys = contextPrefix ? Object.keys(param.metadata.context) : [];
    const fallbackLanguage =
      param.metadata.package.jsonFallbackLanguage ||
      param.metadata.package.fallbackLanguage ||
      param.metadata.project.jsonFallbackLanguage ||
      param.metadata.project.fallbackLanguage;
    await serialPromises(
      param.languages.map(async (lang) => {
        const contextBuffer = contextKeys.map((key) => [keyEscape(contextPrefix + key), param.metadata.context[key]]);
        const mainBuffer = param.keys
          .filter((key) => !contextPrefix || !key.startsWith(contextPrefix))
          .sort()
          .map((key) => {
            try {
              if (isDeletedPhrase(param.phrases[key])) {
                return ["", ""];
              }
              const phrase = param.phrases[key];
              let phraseText = phrase.translations[lang];
              if (phraseText === undefined && fallbackLanguage) {
                phraseText = phrase.translations[fallbackLanguage];
              }
              if (phraseText === undefined) {
                return ["", ""];
              }
              return [keyEscape(key), valueEscape(phraseText)];
            } catch (e) {
              throw new Error(`Error on key: ${key}, lang: ${lang}, ${e}`);
            }
          })
          .filter((v) => v[0] !== "");
        const buffer = [...contextBuffer, ...mainBuffer].reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        );
        const filePath = this.fileSystem.pathJoin(baseDir, `${lang}.json`);
        await this.fileSystem.writeFileAsync(filePath, JSON.stringify(buffer, null, 2));
      }),
    );
  }
}

export default JsonConverter;
