import { SmalledPackage, SmalledProject } from './project';

export type HoshiAPI = {
  openProjectAsync: () => Promise<SmalledProject | undefined>;
  fetchCurrentProjectAsync: () => Promise<SmalledProject | undefined>;
  fetchPackageAsync: (packageId: string) => Promise<SmalledPackage | undefined>;
};

export const HoshiAPIChannel = 'HoshiAPI';
