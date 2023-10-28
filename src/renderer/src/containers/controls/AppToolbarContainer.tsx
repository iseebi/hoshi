import React from 'react';
import { connect } from 'react-redux';
import AppToolbar from '../../components/controls/AppToolbar';

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

const AppToolbarContainer: React.FC<Props> = () => <AppToolbar />;

const mapStateToProps = (/* state: ToolbarState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AppToolbarContainer);

export default Connected;
