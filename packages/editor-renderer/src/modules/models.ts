export const LoadingState = {
  Initial: "initial",
  Loading: "loading",
  Error: "error",
};
export type LoadingState = (typeof LoadingState)[keyof typeof LoadingState];

export type LoadableValue<T> = {
  loadingState: LoadingState;
  value?: T;
};

export const initialLoadableValue = <T>(value?: T): LoadableValue<T> => ({
  loadingState: LoadingState.Initial,
  value,
});
