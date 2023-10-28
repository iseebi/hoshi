import { Provider as ReduxProvider } from 'react-redux';
import { ReactElement } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { defaultTheme, Provider as SpectrumProvider } from '@adobe/react-spectrum';
import { store, history } from './configureStore';
import RootContainer from './containers/RootContainer';
import Router from './containers/Router';
import GlobalStyles from './styles/GlobalStyles';

const App = (): ReactElement => (
  <ReduxProvider store={store}>
    <SpectrumProvider theme={defaultTheme}>
      <GlobalStyles />
      <HistoryRouter history={history}>
        <RootContainer>
          <Router />
        </RootContainer>
      </HistoryRouter>
    </SpectrumProvider>
  </ReduxProvider>
);

export default App;
