import createSagaMiddleware from 'redux-saga';
import { all } from 'typed-redux-saga';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { projectsReducer, projectsSaga } from './modules/projects';
import { packagesReducer, packagesSaga } from './modules/packages';
import { versionsReducer, versionsSaga } from './modules/versions';

const sagaMiddleware = createSagaMiddleware();
function* rootSaga(): Generator {
  yield all([projectsSaga(), packagesSaga(), versionsSaga()]);
}

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    packages: packagesReducer,
    versions: versionsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    });
    // FIXME: 実装する
    // 本番環境ではloggerをdisableされるようにする
    // if (is.dev) {
    //   return [...middleware, sagaMiddleware, routerMiddleware, logger];
    // }
    // return [...middleware, sagaMiddleware, routerMiddleware];
    return [...middleware, sagaMiddleware, logger];
  },
});

const sagaTask = sagaMiddleware.run(rootSaga);
sagaTask.toPromise().catch(() => {
  /* no op */
});

export default store;
