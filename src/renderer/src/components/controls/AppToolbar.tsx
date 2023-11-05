import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { ActionGroup, Item, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import DataAdd from '@spectrum-icons/workflow/DataAdd';
import TextAdd from '@spectrum-icons/workflow/TextAdd';

type Props = {
  hasActiveProject: boolean;
  hasActiveVersion: boolean;
  onAddPackage: () => void;
  onAddVersion: () => void;
};

const Frame = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  padding-top: var(--spectrum-global-dimension-size-85);
  background-color: var(--spectrum-alias-toolbar-background-color);
`;

const addPackageKey = 'AddPackage';
const addVersionKey = 'AddVersion';

// TODO: Translation
const AppToolbar: React.FC<Props> = ({ hasActiveProject, hasActiveVersion, onAddPackage, onAddVersion }) => {
  const disabledKeys = useMemo(
    () =>
      [hasActiveProject ? undefined : addPackageKey, hasActiveVersion ? undefined : addVersionKey].filter(
        (v) => v,
      ) as string[],
    [hasActiveProject, hasActiveVersion],
  );
  return (
    <Frame>
      <ActionGroup
        orientation="vertical"
        isQuiet
        isEmphasized
        disabledKeys={disabledKeys}
        onAction={(key): void => {
          switch (key) {
            case addPackageKey:
              onAddPackage();
              break;
            case addVersionKey:
              onAddVersion();
              break;
            default:
              break;
          }
        }}
      >
        <TooltipTrigger placement="end">
          <Item key={addPackageKey}>
            <DataAdd />
          </Item>
          <Tooltip>Add Package</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger placement="end">
          <Item key={addVersionKey}>
            <TextAdd />
          </Item>
          <Tooltip>Add Version</Tooltip>
        </TooltipTrigger>
      </ActionGroup>
    </Frame>
  );
};

export default AppToolbar;
