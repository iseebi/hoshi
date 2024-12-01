import { BrowserWindow, WebContents } from 'electron';
import createAPIHandler, { APIHandler } from './handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyParameter = any;

const invokeMethod = (
  handlers: Record<string, (...args: AnyParameter[]) => Promise<AnyParameter>>,
  method: string,
  ...args: AnyParameter[]
): Promise<AnyParameter> => {
  const fn = handlers[method];
  if (!fn) {
    throw new Error(`API ${method} not defined`);
  }
  return fn(...args);
};

class HoshiAPIDispatcher {
  private handlersForContexts: Record<number, APIHandler> = {};

  async initializeAsync(window: BrowserWindow): Promise<void> {
    const handler = this.createHandler(window);
    return handler.initializeAsync();
  }

  dispatchAsync(contents: WebContents, method: string, ...args: AnyParameter[]): Promise<AnyParameter> {
    const handler = this.getHandler(contents);
    if (!handler) {
      throw new Error('Invalid API State');
    }
    return invokeMethod(handler.exposed, method, ...args);
  }

  private createHandler(window: BrowserWindow): APIHandler {
    const contextId = window.webContents.id;
    const newHandler = createAPIHandler(window);
    this.handlersForContexts[contextId] = newHandler;
    return newHandler;
  }

  private getHandler(contents: WebContents): APIHandler | undefined {
    const contextId = contents.id;
    return this.handlersForContexts[contextId];
  }
}

export default HoshiAPIDispatcher;
