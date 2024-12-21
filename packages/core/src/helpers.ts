export const serialPromises = async <T>(
  promises: Promise<T>[],
): Promise<void> => {
  for (const promise of promises) {
    await promise;
  }
};
