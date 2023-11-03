import { HoshiAPI } from '../../models';
import createAPIHandler from './handler';

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
  private handlersForContexts: Record<number, HoshiAPI> = {};

  dispatchAsync(contextId: number, method: string, ...args: AnyParameter[]): Promise<AnyParameter> {
    const handler = this.getHandler(contextId);
    return invokeMethod(handler, method, args);
  }

  private getHandler(contextId: number): HoshiAPI {
    if (this.handlersForContexts[contextId]) {
      return this.handlersForContexts[contextId];
    }
    const newHandler = createAPIHandler();
    this.handlersForContexts[contextId] = newHandler;
    return newHandler;
  }
}

export default HoshiAPIDispatcher;
