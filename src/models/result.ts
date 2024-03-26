export type SuccessResult<T> = {
  status: 'success';
  data: T;
};

export type ErrorResult<T> = {
  status: 'error';
  error: T;
};

export type Result<T, E> = SuccessResult<T> | ErrorResult<E>;

export const successResult = <T>(data: T): SuccessResult<T> => ({
  status: 'success',
  data,
});

export const errorResult = <T>(error: T): ErrorResult<T> => ({
  status: 'error',
  error,
});
