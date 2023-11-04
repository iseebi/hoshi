import { EditableVersion, SmalledPackage, SmalledProject, Version } from './project';

export type HoshiAPI = {
  openProjectAsync: () => Promise<SmalledProject | undefined>;
  fetchCurrentProjectAsync: () => Promise<SmalledProject | undefined>;
  fetchPackageAsync: (packageId: string) => Promise<SmalledPackage | undefined>;
  fetchEditableVersionAsync: (packageId: string, versionId: string) => Promise<EditableVersion | undefined>;
  addNewVersionAsync: (packageId: string, versionId: string) => Promise<void>;
  deleteVersionAsync: (packageId: string, versionId: string) => Promise<void>;
  updateVersionAsync: (packageId: string, versionId: string, data: Version) => Promise<void>;
};

export const HoshiAPIChannel = 'HoshiAPI';
