import { promises as fs } from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const createDirIfNotExistAsync = async (dir: string): Promise<void> => {
  const isExist = await (async (): Promise<boolean> => {
    try {
      await fs.access(dir);
      return true;
    } catch (e) {
      return false;
    }
  })();
  if (isExist) {
    return;
  }
  await fs.mkdir(dir, { recursive: true });
};
