import React from "react";
import { connect } from "react-redux";
import ProjectEditor from "../../components/editors/ProjectEditor";

type ExportProps = object;

type StateProps = object;

type DispatchProps = object;

type Props = ExportProps & StateProps & DispatchProps;

const ProjectEditorContainer: React.FC<Props> = () => <ProjectEditor />;

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(ProjectEditorContainer);

export default Connected;
