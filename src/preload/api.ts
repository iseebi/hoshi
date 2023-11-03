import { ipcRenderer } from 'electron';
import { HoshiAPI, HoshiAPIChannel, SmalledPackage, SmalledProject } from '../models';

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
  fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined> {
    return dispatchApi('fetchPackageAsync', packageId);
  },
};

export default api;
