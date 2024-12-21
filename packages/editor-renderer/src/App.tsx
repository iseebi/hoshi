import { Provider as SpectrumProvider, defaultTheme } from "@adobe/react-spectrum";
import React from "react";
import type { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./configureStore";
import RootContainer from "./containers/RootContainer";
import GlobalStyles from "./styles/GlobalStyles";

const App = (): ReactElement => (
  <ReduxProvider store={store}>
    <SpectrumProvider theme={defaultTheme}>
      <GlobalStyles />
      <RootContainer />
    </SpectrumProvider>
  </ReduxProvider>
);

export default App;
