import React from 'react';
import { connect } from 'react-redux';
import TranslationEditor from '../../components/editors/TranslationEditor';
import { RootState } from '../../modules';
import {
  selectActiveLanguages,
  selectEditingTranslationRows,
  selectHasActiveEditingVersion,
  TranslationRow,
} from '../../modules/versions';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  isAvailable: boolean;
  languages: string[];
  rows: TranslationRow[];
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const TranslationEditorContainer: React.FC<Props> = ({ isAvailable, languages, rows }) => (
  <TranslationEditor isAvailable={isAvailable} languages={languages} rows={rows} />
);

const mapStateToProps = (state: RootState): StateProps => ({
  isAvailable: selectHasActiveEditingVersion(state),
  languages: selectActiveLanguages(state),
  rows: selectEditingTranslationRows(state),
});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(TranslationEditorContainer);

export default Connected;
