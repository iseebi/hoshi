import type { HoshiAPI } from "hoshi-models";

type APIHandler = {
  getCurrentApi(): HoshiAPI;
};

type WithAPI = {
  api: HoshiAPI;
};

const apiHandler: APIHandler = {
  getCurrentApi(): HoshiAPI {
    return (window as unknown as WithAPI).api;
  },
};

export default apiHandler;
