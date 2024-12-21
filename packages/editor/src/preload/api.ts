import { ipcRenderer } from "electron";
import {
  type EditableVersion,
  type HoshiAPI,
  HoshiAPIChannel,
  type SmalledPackage,
  type SmalledProject,
  type Version,
} from "hoshi-models";

const dispatchApi = <T>(method: string, ...args: unknown[]): Promise<T> =>
  ipcRenderer.invoke(HoshiAPIChannel, method, ...args) as Promise<T>;

// Custom APIs for renderer
const api: HoshiAPI = {
  openProjectAsync(): Promise<SmalledProject | undefined> {
    return dispatchApi("openProjectAsync");
  },
  fetchCurrentProjectAsync: (): Promise<SmalledProject | undefined> => {
    return dispatchApi("fetchCurrentProjectAsync");
  },
  fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined> {
    return dispatchApi("fetchPackageAsync", packageId);
  },
  addNewPackageAsync(packageId: string): Promise<void> {
    return dispatchApi("addNewPackageAsync", packageId);
  },
  addNewVersionAsync(packageId: string, versionId: string): Promise<void> {
    return dispatchApi("addNewVersionAsync", packageId, versionId);
  },
  deleteVersionAsync(packageId: string, versionId: string): Promise<void> {
    return dispatchApi("deleteVersionAsync", packageId, versionId);
  },
  fetchEditableVersionAsync(packageId: string, versionId: string): Promise<EditableVersion | undefined> {
    return dispatchApi("fetchEditableVersionAsync", packageId, versionId);
  },
  updateVersionAsync(packageId: string, versionId: string, data: Version): Promise<void> {
    return dispatchApi("updateVersionAsync", packageId, versionId, data);
  },
};

export default api;
