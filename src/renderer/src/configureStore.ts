import createSagaMiddleware from 'redux-saga';
import { all } from 'typed-redux-saga';
import { createReduxHistoryContext } from 'redux-first-history';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

const sagaMiddleware = createSagaMiddleware();
function* rootSaga(): Generator {
  yield all([]);
}

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

export const store = configureStore({
  reducer: {
    router: routerReducer,
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
    return [...middleware, sagaMiddleware, routerMiddleware, logger];
  },
});

const sagaTask = sagaMiddleware.run(rootSaga);
sagaTask.toPromise().catch(() => {
  /* no op */
});

export const history = createReduxHistory(store);
