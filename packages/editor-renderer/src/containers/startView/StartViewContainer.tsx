import React from "react";
import { connect } from "react-redux";
import StartView from "../../components/startView/StartView";

type ExportProps = object;

type StateProps = object;

type DispatchProps = object;

type Props = ExportProps & StateProps & DispatchProps;

const StartViewContainer: React.FC<Props> = () => <StartView />;

const mapStateToProps = (/* state: ToolbarState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(StartViewContainer);

export default Connected;
