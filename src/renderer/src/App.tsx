import { Provider as ReduxProvider } from 'react-redux';
import { ReactElement } from 'react';
import { defaultTheme, Provider as SpectrumProvider } from '@adobe/react-spectrum';
import store from './configureStore';
import RootContainer from './containers/RootContainer';
import GlobalStyles from './styles/GlobalStyles';
import TranslationEditorContainer from './containers/editors/TranslationEditorContainer';

const App = (): ReactElement => (
  <ReduxProvider store={store}>
    <SpectrumProvider theme={defaultTheme}>
      <GlobalStyles />
      <RootContainer>
        <TranslationEditorContainer />
      </RootContainer>
    </SpectrumProvider>
  </ReduxProvider>
);

export default App;
