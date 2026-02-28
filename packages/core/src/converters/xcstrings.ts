import { type ExportParameter, isDeletedPhrase } from "hoshi-models";
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

type StringLocalization = {
  stringUnit: {
    state: "translated";
    value: string;
  };
};

type StringEntry = {
  comment?: string;
  localizations?: Record<string, StringLocalization>;
};

type XcodeStringCatalogContent = {
  sourceLanguage: string;
  strings: Record<string, StringEntry>;
  version: "1.0";
};

class XcodeStringCatalogConverter implements Converter {
  public constructor(private fileSystem: FileSystem) {
  }

  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return "xcstrings";
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = this.fileSystem.pathJoin(param.outDir, "xcstrings");
    await this.fileSystem.createDirIfNotExistAsync(baseDir);

    const sourceLanguage =
      param.metadata.package.sourceLanguage ||
      param.metadata.project.sourceLanguage ||
      "en";

    const contextPrefix =
      param.metadata.package.contextPrefix ||
      param.metadata.project.contextPrefix ||
      "";
    const contextKeys = contextPrefix ? Object.keys(param.metadata.context) : [];

    const strings: Record<string, StringEntry> = {};

    // context entries
    for (const key of contextKeys) {
      const fullKey = contextPrefix + key;
      const value = valueEscape(param.metadata.context[key]);
      strings[keyEscape(fullKey)] = {
        localizations: {
          [sourceLanguage]: {
            stringUnit: {state: "translated", value},
          },
        },
      };
    }

    // phrase entries
    for (const key of [...param.keys].sort()) {
      if (contextPrefix && key.startsWith(contextPrefix)) {
        continue;
      }
      const phrase = param.phrases[key];
      if (isDeletedPhrase(phrase)) {
        continue;
      }

      const entry: StringEntry = {};

      const description = phrase.metadata.description;
      if (description) {
        entry.comment = description;
      }

      const localizations: Record<string, StringLocalization> = {};
      for (const lang of param.languages) {
        const text = phrase.translations[lang];
        if (text !== undefined) {
          localizations[lang] = {
            stringUnit: {state: "translated", value: valueEscape(text)},
          };
        }
      }

      if (Object.keys(localizations).length > 0) {
        entry.localizations = localizations;
      }

      strings[keyEscape(key)] = entry;
    }

    const contents: XcodeStringCatalogContent = {
      sourceLanguage,
      strings,
      version: "1.0",
    };

    const buffer = JSON.stringify(contents, null, 2);
    const filePath = this.fileSystem.pathJoin(baseDir, "Localizable.xcstrings");
    await this.fileSystem.writeFileAsync(filePath, buffer);
  }
}

export default XcodeStringCatalogConverter;

