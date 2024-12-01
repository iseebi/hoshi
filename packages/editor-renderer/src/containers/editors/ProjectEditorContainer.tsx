import React from 'react';
import { connect } from 'react-redux';
import ProjectEditor from '../../components/editors/ProjectEditor';

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

const ProjectEditorContainer: React.FC<Props> = () => <ProjectEditor />;

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(ProjectEditorContainer);

export default Connected;
