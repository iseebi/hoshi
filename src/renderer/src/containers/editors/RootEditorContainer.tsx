import React from 'react';
import { connect } from 'react-redux';
import RootEditor from '../../components/editors/RootEditor';
import TranslationEditorContainer from './TranslationEditorContainer';
import BrowserContainer from '../controls/BrowserContainer';

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

const RootEditorContainer: React.FC<Props> = () => (
  <RootEditor browser={<BrowserContainer />}>
    <TranslationEditorContainer />
  </RootEditor>
);

const mapStateToProps = (/* state: ToolbarState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RootEditorContainer);

export default Connected;
