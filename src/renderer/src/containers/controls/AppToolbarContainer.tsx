import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import AppToolbar from '../../components/controls/AppToolbar';
import { openProjectAction, selectHasCurrentProject } from '../../modules/projects';
import { RootState } from '../../modules';
import { selectHasActiveEditingVersion } from '../../modules/versions';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  hasActiveProject: boolean;
  hasActiveVersion: boolean;
};

type DispatchProps = {
  dispatch: {
    openProject: () => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const AppToolbarContainer: React.FC<Props> = ({ hasActiveProject, hasActiveVersion, dispatch }) => (
  <AppToolbar
    hasActiveProject={hasActiveProject}
    hasActiveVersion={hasActiveVersion}
    onAddPackage={(): void => console.log('add package')}
    onAddVersion={(): void => console.log('add version')}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  hasActiveProject: selectHasCurrentProject(state),
  hasActiveVersion: selectHasActiveEditingVersion(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    openProject: () => dispatch(openProjectAction()),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AppToolbarContainer);

export default Connected;
