import { HoshiAPIMethods } from '../../models';
import APIHandler from './handler';

class HoshiAPIDispatcher {
  private handlersForContexts: Record<number, APIHandler> = {};

  async dispatchAsync(contextId: number, method: HoshiAPIMethods): Promise<unknown | undefined> {
    const handler = this.getHandler(contextId);
    switch (method.method) {
      case 'FetchCurrentProject':
        return handler.fetchCurrentProjectAsync();
      default:
        return undefined;
    }
  }

  private getHandler(contextId: number): APIHandler {
    if (this.handlersForContexts[contextId]) {
      return this.handlersForContexts[contextId];
    }
    const newHandler = new APIHandler();
    this.handlersForContexts[contextId] = newHandler;
    return newHandler;
  }
}

export default HoshiAPIDispatcher;
