import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'typed-redux-saga';
import {
  addVersionAction,
  addVersionProgressAction,
  fetchEditableVersionAction,
  fetchEditableVersionProgressAction,
  updateVersionAction,
  updateVersionProgressAction,
} from './actions';
import { bindAsyncTriggerAction } from '../sagaHelpers';
import { EditableVersion } from './types';
import apiHandler from '../../api';
import { fetchPackageAction } from '../packages';

const loadVersionSaga = bindAsyncTriggerAction(
  fetchEditableVersionProgressAction,
  function* action({ packageId, versionId }: { packageId: string; versionId: string }): SagaIterator {
    const api = apiHandler.getCurrentApi();
    return yield* call(() => api.fetchEditableVersionAsync(packageId, versionId));
  },
);

const addVersionSaga = bindAsyncTriggerAction(
  addVersionProgressAction,
  function* action({ packageId, versionId }: { packageId: string; versionId: string }): SagaIterator {
    const api = apiHandler.getCurrentApi();
    yield* call(() => api.addNewVersionAsync(packageId, versionId));
    yield* put(fetchPackageAction({ packageId }));
    // yield* take(fetchPackageProgressAction.done);
    // yield* put(switchVersionAction({ packageId, versionId }));
    // yield* put(fetchEditableVersionAction({ packageId, versionId }));
  },
);

const updateVersionSaga = bindAsyncTriggerAction(
  updateVersionProgressAction,
  function* action({
    packageId,
    versionId,
    data,
  }: {
    packageId: string;
    versionId: string;
    data: EditableVersion;
  }): SagaIterator {
    const api = apiHandler.getCurrentApi();
    return yield* call(() =>
      api.updateVersionAsync(packageId, versionId, {
        id: data.id,
        metadata: data.metadata,
        phrases: data.phrases,
      }),
    );
  },
);

export default function* watch(): SagaIterator {
  yield* takeEvery(fetchEditableVersionAction, loadVersionSaga);
  yield* takeEvery(addVersionAction, addVersionSaga);
  yield* takeEvery(updateVersionAction, updateVersionSaga);
}
