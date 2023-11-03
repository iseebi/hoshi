import React from 'react';
import styled from '@emotion/styled';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

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

const columns = [
  { key: 'id', name: 'ID', resizable: true, frozen: true, width: 200 },
  { key: 'translation.ja-JP', name: 'ja-JP', resizable: true, width: 200 },
  { key: 'translation.en', name: 'en', resizable: true, width: 200 },
];

const rows = [
  { id: 'sample_text_1', 'translation.ja-JP': 'こんにちは', 'translation.en': 'Hello', 'translation.th': '' },
  { id: 'sample_text_2', 'translation.ja-JP': 'さようなら', 'translation.en': 'Goodbye', 'translation.th': '' },
  { id: 'sample_text_2', 'translation.ja-JP': 'さようなら', 'translation.en': 'Goodbye', 'translation.th': '' },
];

const TranslationEditor: React.FC = () => (
  <Frame>
    <GridFrame>
      <DataGrid columns={columns} rows={rows} className="fill-grid" />
    </GridFrame>
  </Frame>
);

export default TranslationEditor;
