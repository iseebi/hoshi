import { promises as fs } from 'fs';
import * as path from 'path';
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
  return input
    .replaceAll(/((?<!%)%(?:\d+\$)?)s/g, '$1@')
    .replaceAll(/"/g, '\\"')
    .replaceAll('\n', '\\n');
};

class AppleStringsConverter implements Converter {
  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return 'strings';
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = path.join(param.outDir, 'strings');
    await createDirIfNotExistAsync(baseDir);
    await serialPromises(
      param.languages.map(async (lang) => {
        const buffer = param.keys
          .map((key) =>
            isDeletedPhrase(param.phrases[key])
              ? ''
              : `"${keyEscape(key)}" = "${valueEscape(param.phrases[key]?.translations[lang])}";`,
          )
          .filter((v) => v !== '')
          .join('\n');
        const filePath = path.join(baseDir, `${lang}.strings`);
        await fs.writeFile(filePath, buffer);
      }),
    );
  }
}

export default AppleStringsConverter;
