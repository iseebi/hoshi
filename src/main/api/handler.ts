import { HoshiAPI, SmalledProject } from '../../models';

class APIHandler implements HoshiAPI {
  // eslint-disable-next-line class-methods-use-this
  async fetchCurrentProjectAsync(): Promise<SmalledProject | undefined> {
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
  }
}

export default APIHandler;
