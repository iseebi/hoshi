import React from 'react';
import { TranslationRow } from '../../../modules/versions';
import TranslationCellFrame from './TranslationCellFrame';

const renderTranslationCell = (language: string): React.FC<{ row: TranslationRow }> =>
  function TranslationCell({ row }: { row: TranslationRow }) {
    return (
      <TranslationCellFrame disabledColor={!row.currentPhrase?.translations[language]}>
        {row.currentPhrase?.translations[language] ?? row.historyPhrase?.translations[language]}
      </TranslationCellFrame>
    );
  };

export default renderTranslationCell;
