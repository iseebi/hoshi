import React from 'react';
import { connect } from 'react-redux';
import AppToolbar from '../../components/controls/AppToolbar';
import { Dispatch } from '@reduxjs/toolkit';
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

const AppToolbarContainer: React.FC<Props> = ({ dispatch }) => <AppToolbar onOpen={dispatch.openProject} />;

const mapStateToProps = (/* state: ToolbarState */): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    openProject: () => dispatch(openProjectAction()),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AppToolbarContainer);

export default Connected;
