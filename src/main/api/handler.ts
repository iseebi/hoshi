import { HoshiAPI, SmalledProject } from '../../models';

export type LocalHoshiAPI = {
  initializeAsync(): Promise<void>;
  exposed: HoshiAPI;
};

const createAPIHandler: () => LocalHoshiAPI = () => ({
  initializeAsync: async (): Promise<void> => {
    /* WIP */
  },
  exposed: {
    // eslint-disable-next-line class-methods-use-this
    fetchCurrentProjectAsync: async (): Promise<SmalledProject | undefined> => {
      return {
        id: '1234',
        metadata: {},
        packages: [
          {
            id: 'app',
            metadata: {},
          },
          {
            id: 'server',
            metadata: {},
          },
        ],
      };
    },
  },
});

export default createAPIHandler;
