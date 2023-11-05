import React from 'react';
import styled from '@emotion/styled';
import { Item, ListBox, Picker, Section, Text } from '@adobe/react-spectrum';

type Props = {
  packages: string[];
  activePackage: string | null;
  versions: string[];
  activeVersion: string | null;
  onPackageSelect: (pkg: string | null) => void;
  onVersionSelect: (version: string) => void;
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  padding: var(--spectrum-global-dimension-size-10);
  background-color: var(--spectrum-alias-toolbar-background-color);
`;

const VersionItemContent = styled.div`
  font-family: var(--spectrum-global-font-family-code);
`;

const ProjectSelectedKey = '**PROJECT**';

// TODO: Translation
const Browser: React.FC<Props> = ({
  packages,
  activePackage,
  versions,
  activeVersion,
  onPackageSelect,
  onVersionSelect,
}) => (
  <Frame>
    <Picker
      aria-label="Package Selector"
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
    <ListBox
      aria-label="Version Selector"
      selectionMode="single"
      flexGrow={1}
      selectedKeys={activeVersion ? [activeVersion] : []}
      onSelectionChange={(selection): void => {
        if (selection === 'all') {
          return;
        }
        const version = selection.values().next().value;
        if (!version) {
          return;
        }
        onVersionSelect(version);
      }}
    >
      {versions.map((version) => (
        <Item key={version} textValue={version}>
          <Text>
            <VersionItemContent>{version}</VersionItemContent>
          </Text>
        </Item>
      ))}
    </ListBox>
  </Frame>
);

export default Browser;
