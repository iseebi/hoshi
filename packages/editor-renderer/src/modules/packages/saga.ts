import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'typed-redux-saga';
import { addPackageAction, addPackageProgressAction, fetchPackageAction, fetchPackageProgressAction } from './actions';
import { bindAsyncTriggerAction } from '../sagaHelpers';
import apiHandler from '../../api';
import { fetchCurrentProjectAction } from '../projects';

const fetchPackageSaga = bindAsyncTriggerAction(
  fetchPackageProgressAction,
  function* action({ packageId }: { packageId: string }): SagaIterator {
    const api = apiHandler.getCurrentApi();
    const pkg = yield* call(() => api.fetchPackageAsync(packageId));
    if (pkg) {
      pkg.versions = pkg.versions.reverse();
    }
    return pkg;
  },
);

const addPackageSaga = bindAsyncTriggerAction(
  addPackageProgressAction,
  function* action({ packageId }: { packageId: string }): SagaIterator {
    const api = apiHandler.getCurrentApi();
    yield* call(() => api.addNewPackageAsync(packageId));
    yield* put(fetchCurrentProjectAction());
    // yield* put(fetchPackageAction({ packageId }));
    // yield* take(fetchPackageProgressAction.done);
    // yield* put(switchVersionAction({ packageId, versionId }));
    // yield* put(fetchEditableVersionAction({ packageId, versionId }));
  },
);

export default function* watch(): SagaIterator {
  yield* takeEvery(fetchPackageAction, fetchPackageSaga);
  yield* takeEvery(addPackageAction, addPackageSaga);
}
