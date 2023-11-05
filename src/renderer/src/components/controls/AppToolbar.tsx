import React from 'react';
import styled from '@emotion/styled';
import FolderOpenOutline from '@spectrum-icons/workflow/FolderOpenOutline';
import { ActionGroup, Item, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';

type Props = {
  onOpen: () => void;
};

const Frame = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  padding-top: var(--spectrum-global-dimension-size-85);
  background-color: var(--spectrum-alias-toolbar-background-color);
`;

// TODO: Translation
const AppToolbar: React.FC<Props> = ({ onOpen }) => (
  <Frame>
    <ActionGroup
      orientation="vertical"
      isQuiet
      isEmphasized
      onAction={(key): void => {
        switch (key) {
          case 'Open':
            onOpen();
            break;
          default:
            break;
        }
      }}
    >
      <TooltipTrigger placement="end">
        <Item key="Open">
          <FolderOpenOutline />
        </Item>
        <Tooltip>Open Project</Tooltip>
      </TooltipTrigger>
    </ActionGroup>
  </Frame>
);

export default AppToolbar;
