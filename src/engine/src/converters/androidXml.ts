import path from 'path';
import { promises as fs } from 'fs';
import { Converter } from './type';
import { ExportParameter } from '../../../models/converter';
import { createDirIfNotExistAsync } from './helpers';
import { serialPromises } from '../helpers';
import { isDeletedPhrase } from '../../../models';

const keyEscape = (input: string): string => input;
const valueEscape = (input: string | undefined): string => {
  if (!input) {
    return '';
  }
  // noinspection JSUnresolvedReference
  const result = input
    .replaceAll(/\n/g, '\\n')
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
  if (result.startsWith(' ') || result.endsWith(' ')) {
    return `"${result}"`;
  }
  return result;
};

class AndroidXmlConverter implements Converter {
  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return 'axml';
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = path.join(param.outDir, 'axml');
    await createDirIfNotExistAsync(baseDir);
    const contextPrefix = param.metadata.package.contextPrefix || param.metadata.project.contextPrefix || '';
    const contextKeys = contextPrefix ? Object.keys(param.metadata.context) : [];
    await serialPromises(
      param.languages.map(async (lang) => {
        const buffer = `<?xml version="1.0" encoding="utf-8"?>
<resources>
${contextKeys
  .map(
    (key) =>
      `    <string name="${keyEscape(contextPrefix + key)}">${valueEscape(param.metadata.context[key])}</string>`,
  )
  .join('\n')}
${param.keys
  .filter((key) => !contextPrefix || !key.startsWith(contextPrefix))
  .sort()
  .map((key) =>
    isDeletedPhrase(param.phrases[key])
      ? ''
      : `    <string name="${keyEscape(key)}">${valueEscape(param.phrases[key]?.translations[lang])}</string>`,
  )
  .filter((v) => v !== '')
  .join('\n')}
</resources>
`;
        const filePath = path.join(baseDir, `${lang}.xml`);
        await fs.writeFile(filePath, buffer);
      }),
    );
  }
}

export default AndroidXmlConverter;
