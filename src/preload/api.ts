import { ipcRenderer } from 'electron';
import { HoshiAPI, HoshiAPIChannel, SmalledProject } from '../models';

const dispatchApi = <T>(method: string, ...args: unknown[]): Promise<T> =>
  ipcRenderer.invoke(HoshiAPIChannel, method, ...args) as Promise<T>;

// Custom APIs for renderer
const api: HoshiAPI = {
  openProjectAsync(): Promise<SmalledProject | undefined> {
    return dispatchApi('openProjectAsync');
  },
  fetchCurrentProjectAsync: (): Promise<SmalledProject | undefined> => {
    return dispatchApi('fetchCurrentProjectAsync');
  },
};

export default api;
