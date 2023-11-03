import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'typed-redux-saga';
import { fetchPackageAction, fetchPackageProgressAction } from './actions';
import { bindAsyncTriggerAction } from '../sagaHelpers';
import apiHandler from '../../api';

const fetchPackageSaga = bindAsyncTriggerAction(
  fetchPackageProgressAction,
  function* action({ packageId }: { packageId: string }): SagaIterator {
    const api = apiHandler.getCurrentApi();
    return yield* call(() => api.fetchPackageAsync(packageId));
  },
);

export default function* watch(): SagaIterator {
  yield* takeEvery(fetchPackageAction, fetchPackageSaga);
}
