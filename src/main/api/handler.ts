import { BrowserWindow, dialog } from 'electron';
import { EditableVersion, HoshiAPI, SmalledPackage, SmalledProject, Version } from '../../models';
import createModulesContainer from './container';

export type APIHandler = {
  initializeAsync(): Promise<void>;
  exposed: HoshiAPI;
};

const createAPIHandler: (window: BrowserWindow) => APIHandler = (window) => {
  const container = createModulesContainer();
  return {
    initializeAsync: async (): Promise<void> => {
      /* WIP */
    },
    exposed: {
      openProjectAsync: async (): Promise<SmalledProject | undefined> => {
        const result = await dialog.showOpenDialog(window, {
          properties: ['openFile'],
          title: 'Select Directory', // FIXME: Translation
          filters: [
            {
              name: 'Hoshi Project (project.hoshi)', // FIXME: Translation
              extensions: ['hoshi'],
            },
          ],
        });
        if (result.canceled) {
          return undefined;
        }
        const path = result.filePaths[0];
        // noinspection UnnecessaryLocalVariableJS
        const project = await container.projects.openProjectAsync(path);
        return project;
      },
      // eslint-disable-next-line class-methods-use-this
      fetchCurrentProjectAsync: async (): Promise<SmalledProject | undefined> => {
        return container.projects.fetchCurrentProjectAsync();
      },
      fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined> {
        return container.packages.fetchPackageAsync(packageId);
      },
      addNewVersionAsync(packageId: string, versionId: string): Promise<void> {
        return container.versions.addNewVersionAsync(packageId, versionId);
      },
      deleteVersionAsync(packageId: string, versionId: string): Promise<void> {
        return container.versions.deleteVersionAsync(packageId, versionId);
      },
      fetchEditableVersionAsync(packageId: string, versionId: string): Promise<EditableVersion | undefined> {
        return container.versions.fetchEditableVersionAsync(packageId, versionId);
      },
      updateVersionAsync(packageId: string, versionId: string, data: Version): Promise<void> {
        return container.versions.updateVersionAsync(packageId, versionId, data);
      },
    },
  };
};

export default createAPIHandler;
