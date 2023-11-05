import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import AppHeader from '../../components/controls/AppHeader';
import { openProjectAction } from '../../modules/projects';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  dispatch: {
    openProject: () => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const AppHeaderContainer: React.FC<Props> = ({ dispatch }) => <AppHeader onOpen={dispatch.openProject} />;

const mapStateToProps = (/* state: HeaderState */): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    openProject: () => dispatch(openProjectAction()),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);

export default Connected;
