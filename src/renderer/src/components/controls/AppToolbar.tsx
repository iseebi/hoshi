import React from 'react';
import styled from '@emotion/styled';
import FolderOpenOutline from '@spectrum-icons/workflow/FolderOpenOutline';
import { ActionGroup, Item, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';

const Frame = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  padding-top: var(--spectrum-global-dimension-size-85, var(--spectrum-alias-size-85));
  background-color: var(--spectrum-alias-toolbar-background-color);
`;

const AppToolbar: React.FC = () => (
  <Frame>
    <ActionGroup orientation="vertical" isQuiet isEmphasized>
      <TooltipTrigger placement="end">
        <Item key="Select">
          <FolderOpenOutline />
        </Item>
        <Tooltip>Select (V)</Tooltip>
      </TooltipTrigger>
    </ActionGroup>
  </Frame>
);

export default AppToolbar;
