import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'typed-redux-saga';
import { fetchCurrentProjectAction, fetchCurrentProjectProgressAction } from './actions';
import { bindAsyncTriggerAction } from '../sagaHelpers';
import apiHandler from '../../api';

const fetchCurrentProjectSaga = bindAsyncTriggerAction(
  fetchCurrentProjectProgressAction,
  function* action(): SagaIterator {
    const api = apiHandler.getCurrentApi();
    return yield* call(() => api.fetchCurrentProjectAsync());
  },
);

export default function* watch(): SagaIterator {
  yield* takeEvery(fetchCurrentProjectAction, fetchCurrentProjectSaga);
}
