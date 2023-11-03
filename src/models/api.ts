import { SmalledProject } from './project';

export interface HoshiAPI {
  fetchCurrentProjectAsync(): Promise<SmalledProject | undefined>;
}

export type FetchCurrentProject = {
  method: 'FetchCurrentProject';
};

export type HoshiAPIMethods = FetchCurrentProject;

export const HoshiAPIChannel = 'HoshiAPI';
