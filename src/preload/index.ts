import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { HoshiAPI, HoshiAPIChannel, HoshiAPIMethods, SmalledProject } from '../models';
import ipcRenderer = Electron.ipcRenderer;

const dispatchApi = <T>(method: HoshiAPIMethods): Promise<T> =>
  ipcRenderer.invoke(HoshiAPIChannel, method) as Promise<T>;

// Custom APIs for renderer
const api: HoshiAPI = {
  fetchCurrentProjectAsync(): Promise<SmalledProject | undefined> {
    return dispatchApi({
      method: 'FetchCurrentProject',
    });
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
