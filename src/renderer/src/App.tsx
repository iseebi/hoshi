import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from './configureStore';
import RootContainer from './containers/RootContainer';
import Router from './containers/Router';

const App = (): ReactElement => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <RootContainer>
        <Router />
      </RootContainer>
    </HistoryRouter>
  </Provider>
);
export default App;
