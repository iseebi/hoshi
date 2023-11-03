export const ProjectFileType = 'hoshi.project:1';
export const PackageFileType = 'hoshi.package:1';
export const VersionFileType = 'hoshi.version:1';

export const AppFileExt = '.hoshi';
export const VersionFileExt = '.yaml';

export const ProjectFileName = `project${AppFileExt}`;
export const PackageFileName = `package${AppFileExt}`;

export type FileHeader = {
  type: string;
};
