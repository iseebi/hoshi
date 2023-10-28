import React from 'react';
import { connect } from 'react-redux';
import TranslationEditor from '../../components/editors/TranslationEditor';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const TranslationEditorContainer: React.FC<Props> = () => <TranslationEditor />;

const mapStateToProps = (/* state: ToolbarState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(TranslationEditorContainer);

export default Connected;
