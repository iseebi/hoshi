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
export declare const isDeletedPhrase: (phrase?: Phrase) => boolean;
export declare const convertFilePhrasesToPhrases: (phrases: Record<string, FilePhrase>) => Record<string, Phrase>;
export declare const convertPhraseToFilePhrase: (phrase: Phrase) => FilePhrase;
export declare const convertPhrasesToFilePhrases: (phrases: Record<string, Phrase>) => Record<string, FilePhrase>;
