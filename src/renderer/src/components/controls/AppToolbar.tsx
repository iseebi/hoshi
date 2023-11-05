import React from 'react';
import styled from '@emotion/styled';
import { ActionButton, DialogTrigger, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import DataAdd from '@spectrum-icons/workflow/DataAdd';
import TextAdd from '@spectrum-icons/workflow/TextAdd';

type Props = {
  hasActiveProject: boolean;
  hasActiveVersion: boolean;
  addPackageDialog: ((close: () => void) => React.ReactElement) | React.ReactElement;
  addVersionDialog: ((close: () => void) => React.ReactElement) | React.ReactElement;
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-top: var(--spectrum-global-dimension-size-85);
  background-color: var(--spectrum-alias-toolbar-background-color);
`;

const Tools = styled.div`
  display: flex;
  flex-direction: column;
`;
const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

// TODO: Translation
const AppToolbar: React.FC<Props> = ({ hasActiveProject, hasActiveVersion, addPackageDialog, addVersionDialog }) => (
  <Frame>
    <Tools>
      <TooltipTrigger placement="end">
        <DialogTrigger>
          <ActionButton isDisabled={!hasActiveProject} isQuiet>
            <DataAdd />
          </ActionButton>
          {addPackageDialog}
        </DialogTrigger>
        <Tooltip>Add Package</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger placement="end">
        <DialogTrigger>
          <ActionButton isDisabled={!hasActiveVersion} isQuiet>
            <TextAdd />
          </ActionButton>
          {addVersionDialog}
        </DialogTrigger>
        <Tooltip>Add Version</Tooltip>
      </TooltipTrigger>
    </Tools>
    <Actions />
  </Frame>
);

export default AppToolbar;
