import { Global, css } from "@emotion/react";
import type React from "react";

const styles = css`
  * {
    padding: 0;
    margin: 0;
    --app-disable-content-color: var(--spectrum-disabled-content-color, var(--spectrum-gray-400));
  }

  ul {
    list-style: none;
  }

  html,
  body {
    height: 100%;
    overflow: hidden;
  }
`;

const GlobalStyles: React.FC = () => <Global styles={styles} />;

export default GlobalStyles;
