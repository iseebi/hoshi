import React from 'react';
import styled from '@emotion/styled';
import { Item, ListView, Picker, Section } from '@adobe/react-spectrum';

type Props = {
  packages: string[];
  activePackage: string | null;
  onPackageSelect: (pkg: string | null) => void;
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  padding: var(--spectrum-global-dimension-size-10, var(--spectrum-alias-size-10));
  background-color: var(--spectrum-alias-toolbar-background-color);
`;

const ProjectSelectedKey = '**PROJECT**';

// TODO: Translation
const Browser: React.FC<Props> = ({ packages, activePackage, onPackageSelect }) => (
  <Frame>
    <Picker
      width="100%"
      marginBottom="size-25"
      selectedKey={activePackage ?? ProjectSelectedKey}
      onSelectionChange={(selected): void => onPackageSelect(selected === ProjectSelectedKey ? null : `${selected}`)}
    >
      <Section>
        <Item key={ProjectSelectedKey} textValue="Project">
          Project
        </Item>
      </Section>
      <Section>
        {packages.map((pkg) => (
          <Item key={pkg} textValue={pkg}>
            {pkg}
          </Item>
        ))}
      </Section>
    </Picker>
    <ListView flexGrow={1}>
      <Item key="v3">0000300 feature2</Item>
      <Item key="v2">0000200 feature1</Item>
      <Item key="v1">0000100 initial</Item>
    </ListView>
  </Frame>
);

export default Browser;
