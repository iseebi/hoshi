import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'typed-redux-saga';
import {
  fetchEditableVersionAction,
  fetchEditableVersionProgressAction,
  updateVersionAction,
  updateVersionProgressAction,
} from './actions';
import { bindAsyncTriggerAction } from '../sagaHelpers';
import { EditableVersion } from './types';
import apiHandler from '../../api';

const loadVersionSaga = bindAsyncTriggerAction(
  fetchEditableVersionProgressAction,
  function* action({ packageId, versionId }: { packageId: string; versionId: string }): SagaIterator {
    const api = apiHandler.getCurrentApi();
    return yield* call(() => api.fetchEditableVersionAsync(packageId, versionId));
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
  yield* takeEvery(updateVersionAction, updateVersionSaga);
}
