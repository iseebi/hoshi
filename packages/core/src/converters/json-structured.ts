import { type ExportParameter, isDeletedPhrase } from "hoshi-models";
import { serialPromises } from "../helpers";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";

const keyEscape = (input: string): string => input;
export const valueEscape = (input: string | undefined): string => input ?? "";

interface Nesting {
  [key: string]: NestingValue;
}
type NestingValue = string | Nesting;

const sortKeys = <T>(input: Record<string, T>): Record<string, T> => {
  const keys = Object.keys(input).sort();
  return keys.reduce(
    (acc, key) => {
      if (typeof input[key] === "object") {
        acc[key] = sortKeys(input[key] as Record<string, T>) as T;
      } else {
        acc[key] = input[key];
      }
      return acc;
    },
    {} as Record<string, T>,
  );
};

export const makeNesting = (input: Record<string, string>): Nesting => {
  const output: Nesting = {};
  for (const [key, value] of Object.entries(input)) {
    const keys = key.split(".");
    let current = output;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        if (typeof current[k] === "object") {
          throw new Error(`${key}: Key conflict. already exists as object`);
        }
        current[k] = value;
      } else {
        if (!current[k]) {
          current[k] = {};
        } else if (typeof current[k] !== "object") {
          throw new Error(`${key}: Key conflict. already exists as value`);
        }
        current = current[k] as Nesting;
      }
    });
  }
  return sortKeys(output);
};

// noinspection DuplicatedCode
class JsonStructuredConverter implements Converter {
  public constructor(private fileSystem: FileSystem) {}

  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return "json-structured";
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = this.fileSystem.pathJoin(param.outDir, "json-structured");
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
        const nestedBuffer = makeNesting(buffer);
        const filePath = this.fileSystem.pathJoin(baseDir, `${lang}.json`);
        await this.fileSystem.writeFileAsync(filePath, JSON.stringify(nestedBuffer, null, 2));
      }),
    );
  }
}

export default JsonStructuredConverter;
