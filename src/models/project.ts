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

export type PackageMetadata = Record<string, never>;

// Version
// ------------------------------

export type Version = {
  id: string;
  metadata: VersionMetadata;
  phrases: Phrase[];
};

export type VersionMetadata = Record<string, never>;

export type Phrase = {
  id: string;
  incomplete: boolean;
  translations: Record<string, string>;
};
