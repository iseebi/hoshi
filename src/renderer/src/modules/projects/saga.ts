import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'typed-redux-saga';
import {
  fetchCurrentProjectAction,
  fetchCurrentProjectProgressAction,
  openProjectAction,
  openProjectProgressAction,
} from './actions';
import { bindAsyncTriggerAction } from '../sagaHelpers';
import apiHandler from '../../api';

const fetchCurrentProjectSaga = bindAsyncTriggerAction(
  fetchCurrentProjectProgressAction,
  function* action(): SagaIterator {
    const api = apiHandler.getCurrentApi();
    return yield* call(() => api.fetchCurrentProjectAsync());
  },
);

const openProjectSaga = bindAsyncTriggerAction(openProjectProgressAction, function* action(): SagaIterator {
  const api = apiHandler.getCurrentApi();
  return yield* call(() => api.openProjectAsync());
});

export default function* watch(): SagaIterator {
  yield* takeEvery(fetchCurrentProjectAction, fetchCurrentProjectSaga);
  yield* takeEvery(openProjectAction, openProjectSaga);
}
