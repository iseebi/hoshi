import { ElectronAPI } from '@electron-toolkit/preload';
import { HoshiAPI } from '../models';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: HoshiAPI;
  }
}
