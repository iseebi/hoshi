import { SmalledProject } from './project';

export type HoshiAPI = {
  fetchCurrentProjectAsync: () => Promise<SmalledProject | undefined>;
};

export const HoshiAPIChannel = 'HoshiAPI';
