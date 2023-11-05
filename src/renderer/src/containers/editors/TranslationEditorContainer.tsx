import React from 'react';
import { connect } from 'react-redux';
import TranslationEditor from '../../components/editors/TranslationEditor';
import { RootState } from '../../modules';
import {
  applyTranslationRow,
  EditableVersion,
  selectActiveEditingVersion,
  selectActiveLanguages,
  selectEditingTranslationRows,
  selectHasActiveEditingVersion,
  TranslationRow,
  updateVersionAction,
} from '../../modules/versions';
import { Dispatch } from '@reduxjs/toolkit';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  packageId: string | null;
  isAvailable: boolean;
  languages: string[];
  rows: TranslationRow[];
  editingVersion: EditableVersion | undefined;
};

type DispatchProps = {
  dispatch: {
    updateVersion: (packageId: string, versionId: string, data: EditableVersion) => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const TranslationEditorContainer: React.FC<Props> = ({
  packageId,
  isAvailable,
  languages,
  rows,
  editingVersion,
  dispatch,
}) => (
  <TranslationEditor
    isAvailable={isAvailable}
    languages={languages}
    rows={rows}
    onRowChange={(row): void => {
      if (!editingVersion || !packageId) {
        return;
      }
      dispatch.updateVersion(packageId, editingVersion.id, applyTranslationRow(editingVersion, row));
    }}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  packageId: state.packages.activePackage,
  isAvailable: selectHasActiveEditingVersion(state),
  languages: selectActiveLanguages(state),
  rows: selectEditingTranslationRows(state),
  editingVersion: selectActiveEditingVersion(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    updateVersion: (packageId, versionId, data) => dispatch(updateVersionAction({ packageId, versionId, data })),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(TranslationEditorContainer);

export default Connected;
