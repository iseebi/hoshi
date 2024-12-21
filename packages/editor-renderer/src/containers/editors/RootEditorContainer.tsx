import React from "react";
import { connect } from "react-redux";
import RootEditor from "../../components/editors/RootEditor";
import type { RootState } from "../../modules";
import BrowserContainer from "../controls/BrowserContainer";
import ProjectEditorContainer from "./ProjectEditorContainer";
import TranslationEditorContainer from "./TranslationEditorContainer";

type ExportProps = object;

type StateProps = {
  activePackage: string | null;
};

type DispatchProps = object;

type Props = ExportProps & StateProps & DispatchProps;

const RootEditorContainer: React.FC<Props> = ({ activePackage }) => (
  <RootEditor browser={<BrowserContainer />}>
    {activePackage === null ? <ProjectEditorContainer /> : <TranslationEditorContainer />}
  </RootEditor>
);

const mapStateToProps = (state: RootState): StateProps => ({
  activePackage: state.packages.activePackage,
});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RootEditorContainer);

export default Connected;
