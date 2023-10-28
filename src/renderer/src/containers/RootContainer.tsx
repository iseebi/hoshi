import React from 'react';
import { connect } from 'react-redux';
import Root from '../components/Root';
import AppHeaderContainer from './controls/AppHeaderContainer';
import AppToolbarContainer from './controls/AppToolbarContainer';

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

const RootContainer: React.FC<Props> = ({ children }) => (
  <Root header={<AppHeaderContainer />} toolbar={<AppToolbarContainer />}>
    {children}
  </Root>
);

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RootContainer);

export default Connected;
