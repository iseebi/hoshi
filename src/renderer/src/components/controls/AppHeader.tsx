import React from 'react';
import styled from '@emotion/styled';
import { ActionGroup, Item, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import FolderOpenOutline from '@spectrum-icons/workflow/FolderOpenOutline';

type Props = {
  onOpen: () => void;
};

const Frame = styled.div`
  background-color: var(--spectrum-alias-toolbar-background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding-left: ${window.navigator.userAgent.toLowerCase().indexOf('mac') !== -1
    ? `var(--spectrum-global-dimension-size-1000);`
    : `var(--spectrum-global-dimension-size-100);`};
  padding-right: var(--spectrum-global-dimension-size-100);
`;

const HeaderContent = styled.div``;

const DragArea = styled.div`
  -webkit-app-region: drag;
`;

const ActionsArea = styled.div`
  -webkit-app-region: no-drag;
`;

const AppHeader: React.FC<Props> = ({ onOpen }) => (
  <DragArea>
    <Frame>
      <HeaderContent />
      <HeaderContent />
      <HeaderContent>
        <ActionsArea>
          <ActionGroup
            orientation="horizontal"
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
        </ActionsArea>
      </HeaderContent>
    </Frame>
  </DragArea>
);

export default AppHeader;
