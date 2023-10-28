import React from 'react';
import styled from '@emotion/styled';

const Frame = styled.div`
  background-color: var(--spectrum-alias-toolbar-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const DragArea = styled.div`
  -webkit-app-region: drag;
`;

const AppHeader: React.FC = () => (
  <DragArea>
    <Frame />
  </DragArea>
);

export default AppHeader;
