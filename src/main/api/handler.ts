import { HoshiAPI, SmalledProject } from '../../models';

const createAPIHandler: () => HoshiAPI = () => ({
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
});

export default createAPIHandler;
