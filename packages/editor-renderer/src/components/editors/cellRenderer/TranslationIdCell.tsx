import styled from "@emotion/styled";
import React from "react";
import type { TranslationRow } from "../../../modules/versions";

const Frame = styled.div<{ disabledColor?: boolean }>`
  color: ${({ disabledColor }): string =>
    disabledColor
      ? "var(--app-disable-content-color)"
      : "var(--spectrum-body-text-color,var(--spectrum-alias-text-color))"};
  font-family: var(--spectrum-global-font-family-code);
  padding: 0 6px 0 6px;
`;

const TranslationIdCell: React.FC<{ row: TranslationRow }> = ({ row }) => (
  <Frame className="spectrum-Code" disabledColor={!row.currentPhrase}>
    {row.id}
  </Frame>
);

export default TranslationIdCell;
