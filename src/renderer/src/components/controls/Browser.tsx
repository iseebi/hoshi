import React from 'react';
import styled from '@emotion/styled';
import { Item, ListView, Picker, Section } from '@adobe/react-spectrum';

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: calc(100% - var(--spectrum-global-dimension-size-25));
  padding: var(--spectrum-global-dimension-size-10, var(--spectrum-alias-size-10));
  background-color: var(--spectrum-alias-toolbar-background-color);
`;

const Browser: React.FC = () => (
  <Frame>
    <Picker width="100%" marginBottom="size-25">
      <Section>
        <Item key="Project">Project</Item>
      </Section>
      <Section>
        <Item key="app">app</Item>
        <Item key="server">server</Item>
      </Section>
    </Picker>
    <ListView flexGrow={1}>
      <Item key="v1">v1</Item>
    </ListView>
  </Frame>
);

export default Browser;
