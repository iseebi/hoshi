import React from 'react';
import styled from '@emotion/styled';
import { TranslationRow } from '../../../modules/versions';

export const TranslationIdCellFrame = styled.div<{ disabledColor?: boolean }>`
  color: ${({ disabledColor }): string => (disabledColor ? 'var(--app-disable-content-color)' : 'inherit')};
  font-family: var(--spectrum-global-font-family-code);
  padding: 0 6px 0 6px;
`;

export const TranslationCellFrame = styled.div<{ disabledColor?: boolean }>`
  color: ${({ disabledColor }): string => (disabledColor ? 'var(--app-disable-content-color)' : 'inherit')};
  padding: 0 6px 0 6px;
`;

export const TranslationIdCell: React.FC<{ row: TranslationRow }> = ({ row }) => (
  <TranslationIdCellFrame className="spectrum-Code" disabledColor={!row.currentPhrase}>
    {row.id}
  </TranslationIdCellFrame>
);

export const renderTranslationCell = (language: string): React.FC<{ row: TranslationRow }> =>
  function TranslationCell({ row }: { row: TranslationRow }) {
    return (
      <TranslationCellFrame disabledColor={!row.currentPhrase?.translations[language]}>
        {row.currentPhrase?.translations[language] ?? row.historyPhrase?.translations[language]}
      </TranslationCellFrame>
    );
  };
