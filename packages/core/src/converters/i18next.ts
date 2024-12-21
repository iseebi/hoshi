import { type ExportParameter, isDeletedPhrase } from "hoshi-models";
import { serialPromises } from "../helpers";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";

const keyEscape = (input: string): string => input;
export const valueEscape = (input: string | undefined): string => {
  if (!input) {
    return "";
  }

  let output = "";
  let varIndex = 0;

  for (let i = 0; i < input.length; i += 1) {
    const nextIndex = input.indexOf("%", i);
    if (nextIndex === -1) {
      output += input.substring(i);
      break;
    }
    if (input.charAt(nextIndex + 1) === "%") {
      output += "%";
      i = nextIndex + 1;
    } else {
      // そこまでの文字列は確定
      output += input.substring(i, nextIndex);

      // s, d, f を探す
      const conversionIndex = input.substring(nextIndex).search(/[sdf]/);
      if (conversionIndex === -1) {
        throw new Error("Format string is invalid");
      }

      // 書式指定文字列を得る
      const formatString = input.substring(nextIndex, nextIndex + conversionIndex + 1);

      // 書式指定文字列のパラメータをパース
      const params = formatString.match(/^%(?:(\d+)\$)?(\d+)?(?:\.(\d+))?([sdf])$/);
      if (!params) {
        throw new Error("Format string is invalid");
      }
      const [, argIndex, minimumIntegerDigits, minimumFractionDigits] = params;
      const fragments: string[] = [];
      if (argIndex) {
        fragments.push(`arg${argIndex}`);
      } else {
        varIndex += 1;
        fragments.push(`v${varIndex}`);
      }
      if (minimumIntegerDigits) {
        fragments.push(`minimumIntegerDigits: ${minimumIntegerDigits}`);
      }
      if (minimumFractionDigits) {
        fragments.push(`minimumFractionDigits: ${minimumFractionDigits}`);
      }
      output += `{{${fragments.join(", ")}}}`;
      i = nextIndex + conversionIndex;
    }
  }

  return output;
};

// noinspection DuplicatedCode
class I18NextConverter implements Converter {
  public constructor(private fileSystem: FileSystem) {}

  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return "i18next";
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = this.fileSystem.pathJoin(param.outDir, "i18next");
    await this.fileSystem.createDirIfNotExistAsync(baseDir);
    const contextPrefix = param.metadata.package.contextPrefix || param.metadata.project.contextPrefix || "";
    const contextKeys = contextPrefix ? Object.keys(param.metadata.context) : [];
    await serialPromises(
      param.languages.map(async (lang) => {
        const contextBuffer = contextKeys.map((key) => [keyEscape(contextPrefix + key), param.metadata.context[key]]);
        const mainBuffer = param.keys
          .filter((key) => !contextPrefix || !key.startsWith(contextPrefix))
          .sort()
          .map((key) => {
            try {
              return isDeletedPhrase(param.phrases[key])
                ? ["", ""]
                : [keyEscape(key), valueEscape(param.phrases[key]?.translations[lang])];
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

export default I18NextConverter;
