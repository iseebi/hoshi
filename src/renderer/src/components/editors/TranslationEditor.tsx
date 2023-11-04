import React from 'react';
import styled from '@emotion/styled';
import DataGrid, { ColumnOrColumnGroup } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { EditableVersion } from '../../modules/versions';

type Props = {
  editingVersion: EditableVersion | undefined;
};

// noinspection CssInvalidPropertyValue
const Frame = styled.div`
  contain: inline-size;
  height: 100%;

  padding-top: var(--spectrum-global-dimension-size-10, var(--spectrum-alias-size-10));
  padding-right: calc(var(--spectrum-global-dimension-size-10, var(--spectrum-alias-size-10)) * 2);
  overflow: scroll;
`;

const GridFrame = styled.div`
  height: 100%;
  .fill-grid {
    height: 100%;
  }
`;

const createColumns = (translations: string[]): ColumnOrColumnGroup<Record<string, string>>[] => [
  { key: 'id', name: 'ID', resizable: true, frozen: true, width: 200 },
  ...translations.map((lang) => ({
    key: `translation.${lang}`,
    name: lang,
    resizable: true,
    width: 200,
  })),
];

const createRows = (editingVersion: EditableVersion): Record<string, string>[] =>
  editingVersion.keys.map((key) => ({
    id: key,
    ...editingVersion.languages.reduce(
      (prev, lang) => ({
        ...prev,
        [`translation.${lang}`]:
          editingVersion.phrases[key]?.translations[lang] ?? editingVersion.historyPhrases[key]?.translations[lang],
      }),
      {} as Record<string, string>,
    ),
  }));

const TranslationEditor: React.FC<Props> = ({ editingVersion }) => (
  <Frame>
    {editingVersion && (
      <GridFrame>
        <DataGrid
          columns={createColumns(editingVersion.languages)}
          rows={createRows(editingVersion)}
          className="fill-grid"
        />
      </GridFrame>
    )}
  </Frame>
);

export default TranslationEditor;
