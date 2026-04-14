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
  const result = input
    .replaceAll(/\n/g, "\\n")
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"')
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  if (result.startsWith(" ") || result.endsWith(" ")) {
    return `"${result}"`;
  }
  return result;
};

type ResourceTagAttributeMetadata = string | string[] | Record<string, unknown>;

// XML attribute: Name="Value" or Name='Value'
// Name starts with letter, underscore, or colon; followed by letters, digits, '.', '-', '_', ':'
// Multiple attributes must be separated by whitespace
const XML_ATTR = /[a-zA-Z_:][-a-zA-Z0-9._:]*\s*=\s*(?:"[^"<]*"|'[^'<]*')/;
const XML_ATTRIBUTES_REGEX = new RegExp(
  `^\\s*$|^\\s*${XML_ATTR.source}(\\s+${XML_ATTR.source})*\\s*$`,
);

export const validateXmlAttributes = (tagAttributes: string): void => {
  if (!XML_ATTRIBUTES_REGEX.test(tagAttributes)) {
    throw new Error(`Invalid XML tag attribute: "${tagAttributes}"`);
  }
};

const createResourceTag = (attrs: ResourceTagAttributeMetadata | undefined): string => {
  if (!attrs) {
    return "<resources>";
  }
  let tagAttributes = "";
  if (typeof attrs === "object") {
    const attrDict = attrs as Record<string, unknown>;
    tagAttributes = Object.keys(attrDict).map((key) => `${key}="${attrDict[key]}"`).join(" ");
  } else if (Array.isArray(attrs)) {
    tagAttributes = attrs.join(" ");
  } else {
    tagAttributes = attrs as string;
  }

  if (!tagAttributes) {
    return "<resources>";
  }

  validateXmlAttributes(tagAttributes);

  return `<resources ${tagAttributes}>`;
};

class AndroidXmlConverter implements Converter {
  public constructor(private fileSystem: FileSystem) {}

  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return "axml";
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = this.fileSystem.pathJoin(param.outDir, "axml");
    await this.fileSystem.createDirIfNotExistAsync(baseDir);
    const contextPrefix = param.metadata.package.contextPrefix || param.metadata.project.contextPrefix || "";
    const contextKeys = contextPrefix ? Object.keys(param.metadata.context) : [];
    const resourceTagAttributes: ResourceTagAttributeMetadata = param.metadata.version.androidXmlResourceTagAttributes ||  param.metadata.package.androidXmlResourceTagAttributes || param.metadata.project.androidXmlResourceTagAttributes;
    await serialPromises(
      param.languages.map(async (lang) => {
        const buffer = `<?xml version="1.0" encoding="utf-8"?>
${createResourceTag(resourceTagAttributes)}
${contextKeys
  .map(
    (key) =>
      `    <string name="${keyEscape(contextPrefix + key)}">${valueEscape(param.metadata.context[key])}</string>`,
  )
  .join("\n")}
${param.keys
  .filter((key) => !contextPrefix || !key.startsWith(contextPrefix))
  .sort()
  .map((key) => {
    if (isDeletedPhrase(param.phrases[key]) || (param.phrases[key]?.translations[lang] === undefined)) {
      return "";
    }
    return `    <string name="${keyEscape(key)}">${valueEscape(param.phrases[key]?.translations[lang])}</string>`;
  })
  .filter((v) => v !== "")
  .join("\n")}
</resources>
`;
        const filePath = this.fileSystem.pathJoin(baseDir, `${lang}.xml`);
        await this.fileSystem.writeFileAsync(filePath, buffer);
      }),
    );
  }
}

export default AndroidXmlConverter;
