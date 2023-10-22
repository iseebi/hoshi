import {ReactElement} from "react";
import {CommonTest} from "../../common/src";

function App(): ReactElement {
  return (
    <div className="container">
      Test + {new CommonTest().doTest()}
    </div>
  )
}

export default App
