import { ReactElement } from 'react';
import { CommonTest } from '../../common/src';

const App = (): ReactElement => <div className="container">Test +{new CommonTest().doTest()}</div>;

export default App;
