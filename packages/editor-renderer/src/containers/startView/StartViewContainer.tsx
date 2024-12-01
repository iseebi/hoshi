import React from 'react';
import { connect } from 'react-redux';
import StartView from '../../components/startView/StartView';

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

const StartViewContainer: React.FC<Props> = () => <StartView />;

const mapStateToProps = (/* state: ToolbarState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(StartViewContainer);

export default Connected;
