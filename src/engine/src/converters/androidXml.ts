import path from 'path';
import { promises as fs } from 'fs';
import { Converter } from './type';
import { ExportParameter } from '../../../models/converter';
import { createDirIfNotExistAsync } from './helpers';
import { serialPromises } from '../helpers';

const keyEscape = (input: string): string => input;
const valueEscape = (input: string | undefined): string => input ?? '';

class AndroidXmlConverter implements Converter {
  // eslint-disable-next-line class-methods-use-this
  getName(): string {
    return 'axml';
  }

  // eslint-disable-next-line class-methods-use-this
  async exportAsync(param: ExportParameter): Promise<void> {
    const baseDir = path.join(param.outDir, 'axml');
    await createDirIfNotExistAsync(baseDir);
    await serialPromises(
      param.languages.map(async (lang) => {
        const buffer = `<?xml version="1.0" encoding="utf-8"?>
<resources>
${param.keys
  .map((key) => `    <string name="${keyEscape(key)}">${valueEscape(param.phrases[key]?.translations[lang])}</string>`)
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
