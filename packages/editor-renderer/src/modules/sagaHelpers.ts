import { Action, AsyncActionCreators } from 'typescript-fsa';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { call, SagaGenerator, spawn } from 'typed-redux-saga';

// eslint-disable-next-line import/prefer-default-export
export const bindAsyncTriggerAction = <Params, Result, Error>(
  progressAction: AsyncActionCreators<Params, Result, Error>,
  worker: (params: Params) => Promise<Result> | SagaIterator<Result>,
): ((action: Action<Params>) => SagaIterator) => {
  const progressSaga = bindAsyncAction(progressAction)(function* progressSagaAction(
    payload: Params,
  ): SagaGenerator<Result> {
    const result = yield* call(worker, payload);
    return result as unknown as Result;
  });
  return function* triggerSaga(action: Action<Params>) {
    yield* spawn(progressSaga, action.payload);
  };
};
