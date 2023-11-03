import React from 'react';
import { connect } from 'react-redux';
import RootEditor from '../../components/editors/RootEditor';
import TranslationEditorContainer from './TranslationEditorContainer';
import BrowserContainer from '../controls/BrowserContainer';
import { RootState } from '../../modules';
import ProjectEditorContainer from './ProjectEditorContainer';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  activePackage: string | null;
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const RootEditorContainer: React.FC<Props> = ({ activePackage }) => (
  <RootEditor browser={<BrowserContainer />}>
    {activePackage === null ? <ProjectEditorContainer /> : <TranslationEditorContainer />}
  </RootEditor>
);

const mapStateToProps = (state: RootState): StateProps => ({
  activePackage: state.projects.activePackage,
});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RootEditorContainer);

export default Connected;
