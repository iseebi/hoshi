import React from 'react';
import { connect } from 'react-redux';
import AppHeader from '../../components/controls/AppHeader';

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

const AppHeaderContainer: React.FC<Props> = () => <AppHeader />;

const mapStateToProps = (/* state: HeaderState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);

export default Connected;
