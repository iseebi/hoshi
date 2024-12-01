import styled from "@emotion/styled";
import type React from "react";

type Props = {
  browser?: React.ReactNode;
  children?: React.ReactNode;
};

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 3px);
`;

const BrowserFrame = styled.div`
  min-width: 280px;
`;
const ContentsFrame = styled.div`
  flex-grow: 1;
`;

const RootEditor: React.FC<Props> = ({ browser, children }) => (
  <Frame>
    <BrowserFrame>{browser}</BrowserFrame>
    <ContentsFrame>{children}</ContentsFrame>
  </Frame>
);

export default RootEditor;
