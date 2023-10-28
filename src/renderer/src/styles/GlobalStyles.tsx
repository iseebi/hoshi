import React from 'react';
import { Global, css } from '@emotion/react';

const styles = css`
  * {
    padding: 0;
    margin: 0;
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
