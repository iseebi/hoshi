// Project
// ------------------------------

export type ProjectHeader = {
  id: string;
  metadata: ProjectMetadata;
};

export type Project = ProjectHeader & {
  packages: Package[];
};

export type SmalledProject = ProjectHeader & {
  packages: string[];
};

export type ProjectMetadata = Record<string, never>;

// Package
// ------------------------------

export type PackageHeader = {
  id: string;
  metadata: PackageMetadata;
};

export type Package = PackageHeader & {
  versions: Version[];
};

export type SmalledPackage = PackageHeader & {
  versions: string[];
};

export type PackageMetadata = Record<string, never>;

// Version
// ------------------------------

export type VersionHeader = {
  id: string;
  metadata: VersionMetadata;
};

export type Version = VersionHeader & {
  phrases: Record<string, Phrase>;
};

export type VersionMetadata = Record<string, never>;

export type VersionFile = VersionHeader & {
  phrases: Record<string, FilePhrase>;
};

export type FilePhrase = Record<string, string>;

export type Phrase = {
  id: string;
  metadata: Record<string, string>;
  translations: Record<string, string>;
};

export type EditableVersion = VersionHeader & {
  languages: string[];
  keys: string[];
  phrases: Record<string, Phrase>;
  historyPhrases: Record<string, Phrase>;
};

export const isDeletedPhrase = (phrase?: Phrase): boolean => {
  return phrase?.metadata?.deleted === "true";
};

const sortDictionary = <T>(dict: Record<string, T>): Record<string, T> =>
  Object.keys(dict)
    .sort()
    .reduce(
      (prev, key) => {
        prev[key] = dict[key];
        return prev;
      },
      {} as Record<string, T>,
    );

const convertFilePhraseToPhrase = (id: string, phrase: FilePhrase): Phrase => {
  return Object.keys(phrase).reduce(
    (prev, key) => {
      if (key.startsWith("$")) {
        prev.metadata[key.substring(1)] = phrase[key];
        return prev;
      }
      prev.translations[key] = phrase[key];
      return prev;
    },
    {
      id,
      metadata: {},
      translations: {},
    } as Phrase,
  );
};
export const convertFilePhrasesToPhrases = (
  phrases: Record<string, FilePhrase>,
): Record<string, Phrase> => {
  return Object.keys(phrases).reduce(
    (prev, cur) => {
      prev[cur] = convertFilePhraseToPhrase(cur, phrases[cur]);
      return prev;
    },
    {} as Record<string, Phrase>,
  );
};

export const convertPhraseToFilePhrase = (phrase: Phrase): FilePhrase =>
  sortDictionary({
    ...Object.keys(phrase.metadata).reduce(
      (prev, cur) => {
        prev[`${cur}`] = phrase.metadata[cur];
        return prev;
      },
      {} as Record<string, string>,
    ),
    ...Object.keys(phrase.translations).reduce(
      (prev, cur) => {
        prev[`${cur}`] = phrase.translations[cur];
        return prev;
      },
      {} as Record<string, string>,
    ),
  });

export const convertPhrasesToFilePhrases = (
  phrases: Record<string, Phrase>,
): Record<string, FilePhrase> =>
  sortDictionary(
    Object.keys(phrases).reduce(
      (prev, cur) => {
        prev[cur] = convertPhraseToFilePhrase(phrases[cur]);
        return prev;
      },
      {} as Record<string, FilePhrase>,
    ),
  );
