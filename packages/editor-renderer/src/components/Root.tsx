import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@adobe/react-spectrum';

type Props = {
  header?: React.ReactNode;
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
};

const Background = styled.div`
  height: 100vh;
  background-color: var(--spectrum-alias-appframe-border-color);
`;

const RootGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Grid
    areas={['header header', 'toolbar content']}
    columns={['size-600', 'auto']}
    rows={['size-500', 'auto']}
    height="100vh"
    gap="size-25"
  >
    {children}
  </Grid>
);

const RootGridItem = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }): string => gridArea};
`;

const Root: React.FC<Props> = ({ header, toolbar, children }) => (
  <Background>
    <RootGrid>
      <RootGridItem gridArea="header">{header}</RootGridItem>
      <RootGridItem gridArea="toolbar">{toolbar}</RootGridItem>
      <RootGridItem gridArea="content">{children}</RootGridItem>
    </RootGrid>
  </Background>
);

export default Root;
