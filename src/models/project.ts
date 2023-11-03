export type Project = {
  id: string;
  metadata: ProjectMetadata;
  packages: Package[];
};

export type ProjectMetadata = Record<string, never>;

export type Package = {
  id: string;
  metadata: PackageMetadata;
  versions: Version[];
};

export type PackageMetadata = Record<string, never>;

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

export type SmalledProject = Omit<Project, 'packages'> & {
  packages: SmalledPackage[];
};

export type SmalledPackage = Omit<Package, 'versions'>;
