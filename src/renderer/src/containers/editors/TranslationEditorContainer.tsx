import React from 'react';
import { connect } from 'react-redux';
import TranslationEditor from '../../components/editors/TranslationEditor';
import { RootState } from '../../modules';
import { EditableVersion, selectActiveEditingVersion } from '../../modules/versions';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  editingVersion: EditableVersion | undefined;
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const TranslationEditorContainer: React.FC<Props> = ({ editingVersion }) => (
  <TranslationEditor editingVersion={editingVersion} />
);

const mapStateToProps = (state: RootState): StateProps => ({
  editingVersion: selectActiveEditingVersion(state),
});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(TranslationEditorContainer);

export default Connected;
