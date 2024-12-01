import { HoshiAPI } from '../../../models';

type APIHandler = {
  getCurrentApi(): HoshiAPI;
};

const apiHandler: APIHandler = {
  // eslint-disable-next-line class-methods-use-this
  getCurrentApi(): HoshiAPI {
    return window.api;
  },
};

export default apiHandler;
