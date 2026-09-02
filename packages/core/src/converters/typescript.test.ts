import type { ExportParameter } from 'hoshi-models';
import type { FileSystem } from '../platform';
import TypeScriptConverter from './typescript';

test('preserves percent characters in exported translations', async () => {
  const writeFileAsync = jest.fn<Promise<void>, [string, string]>().mockResolvedValue(undefined);
  const fileSystem = {
    pathJoin: (...paths: string[]) => paths.join('/'),
    createDirIfNotExistAsync: jest.fn<Promise<void>, [string]>().mockResolvedValue(undefined),
    writeFileAsync,
  } as unknown as FileSystem;
  const converter = new TypeScriptConverter(fileSystem);
  const param: ExportParameter = {
    format: 'typescript',
    outDir: 'output',
    metadata: {
      project: {},
      package: {},
      version: {},
      context: {},
    },
    languages: ['en'],
    keys: ['rate'],
    phrases: {
      rate: {
        id: 'rate',
        metadata: {},
        translations: {
          en: 'Complete: 100%; token: %s; escape: %%',
        },
      },
    },
  };

  await converter.exportAsync(param);

  expect(writeFileAsync).toHaveBeenCalledWith(
    'output/typescript/en.ts',
    expect.stringContaining('rate: "Complete: 100%; token: %s; escape: %%"'),
  );
});
