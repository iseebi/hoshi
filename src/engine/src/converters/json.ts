import { promises as fs } from 'fs';
import path from 'path';
import { isDeletedPhrase } from '../../../models';
import { serialPromises } from '../helpers';
import { createDirIfNotExistAsync } from './helpers';
import { Converter } from './type';
import { ExportParameter } from '../../../models/converter';

const keyEscape = (input: string): string => input;
export const valueEscape = (input: string | undefined): string => input ?? '';

// noinspection DuplicatedCode
class JsonConverter implements Converter {
  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return 'json';
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = path.join(param.outDir, 'json');
    await createDirIfNotExistAsync(baseDir);
    const contextPrefix = param.metadata.package.contextPrefix || param.metadata.project.contextPrefix || '';
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
                ? ['', '']
                : [keyEscape(key), valueEscape(param.phrases[key]?.translations[lang])];
            } catch (e) {
              throw new Error(`Error on key: ${key}, lang: ${lang}, ${e}`);
            }
          })
          .filter((v) => v[0] !== '');
        const buffer = [...contextBuffer, ...mainBuffer].reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        );
        const filePath = path.join(baseDir, `${lang}.json`);
        await fs.writeFile(filePath, JSON.stringify(buffer, null, 2));
      }),
    );
  }
}

export default JsonConverter;
