// eslint-disable-next-line import/prefer-default-export
export const serialPromises = async <T>(promises: Promise<T>[]): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const promise of promises) {
    // eslint-disable-next-line no-await-in-loop
    await promise;
  }
};
