import { ReducerBuilder } from 'typescript-fsa-reducers';
import { ActionCreator, ActionCreatorFactory, AsyncActionCreators } from 'typescript-fsa';
import { LoadableValue, LoadingState } from './models';

export const createAsyncActionCreator = <Params, Result, Error = Record<string, unknown>>(
  factory: ActionCreatorFactory,
  name: string,
): [ActionCreator<Params>, AsyncActionCreators<Params, Result, Error>] => [
  factory<Params>(name),
  factory.async<Params, Result, Error>(name),
];

export const registerProgressAction = <S, Params, Result, Error>(
  reducer: ReducerBuilder<S>,
  actionCreator: AsyncActionCreators<Params, Result, Error>,
  handler: (state: S, params: { params?: Params; value: LoadableValue<Result>; error?: Error }) => S,
): ReducerBuilder<S> => {
  reducer
    .case(actionCreator.started, (state, params) =>
      handler(state, { params, value: { loadingState: LoadingState.Loading } }),
    )
    .case(actionCreator.done, (state, { params, result }) =>
      handler(state, {
        params,
        value: {
          loadingState: LoadingState.Initial,
          value: result,
        },
      }),
    )
    .case(actionCreator.failed, (state, { params, error }) =>
      handler(state, {
        params,
        error,
        value: { loadingState: LoadingState.Error },
      }),
    );
  return reducer;
};
