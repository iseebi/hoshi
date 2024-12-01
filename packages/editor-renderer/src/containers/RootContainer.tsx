import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import Root from '../components/Root';
import AppHeaderContainer from './controls/AppHeaderContainer';
import AppToolbarContainer from './controls/AppToolbarContainer';
import { fetchCurrentProjectAction, selectHasCurrentProject } from '../modules/projects';
import { useOnMount } from './sideEffects';
import StartViewContainer from './startView/StartViewContainer';
import { RootState } from '../modules';
import RootEditorContainer from './editors/RootEditorContainer';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  hasCurrentProject: boolean;
};

type DispatchProps = {
  dispatch: {
    fetchCurrentProject: () => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const RootContainer: React.FC<Props> = ({ hasCurrentProject, dispatch }) => {
  useOnMount(() => {
    dispatch.fetchCurrentProject();
  });

  return (
    <Root header={<AppHeaderContainer />} toolbar={<AppToolbarContainer />}>
      {hasCurrentProject ? <RootEditorContainer /> : <StartViewContainer />}
    </Root>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  hasCurrentProject: selectHasCurrentProject(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    fetchCurrentProject: () => dispatch(fetchCurrentProjectAction()),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RootContainer);

export default Connected;
