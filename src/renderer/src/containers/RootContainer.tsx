import React from 'react';
import { connect } from 'react-redux';
import Root from '../components/Root';

type ExportProps = {
  children?: React.ReactNode;
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const RootContainer: React.FC<Props> = ({ children }) => <Root>{children}</Root>;

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const ConnectedRootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainer);

export default ConnectedRootContainer;
