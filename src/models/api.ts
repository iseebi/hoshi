import { SmalledProject } from './project';

export type HoshiAPI = {
  openProjectAsync: () => Promise<SmalledProject | undefined>;
  fetchCurrentProjectAsync: () => Promise<SmalledProject | undefined>;
};

export const HoshiAPIChannel = 'HoshiAPI';
