import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import Root from '../components/Root';
import AppHeaderContainer from './controls/AppHeaderContainer';
import AppToolbarContainer from './controls/AppToolbarContainer';
import BrowserContainer from './controls/BrowserContainer';
import { fetchCurrentProjectAction } from '../modules/projects';
import { useOnMount } from './sideEffects';

type ExportProps = {
  children?: React.ReactNode;
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  dispatch: {
    fetchCurrentProject: () => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const RootContainer: React.FC<Props> = ({ children, dispatch }) => {
  useOnMount(() => {
    dispatch.fetchCurrentProject();
  });

  return (
    <Root header={<AppHeaderContainer />} toolbar={<AppToolbarContainer />} browser={<BrowserContainer />}>
      {children}
    </Root>
  );
};

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    fetchCurrentProject: () => dispatch(fetchCurrentProjectAction()),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RootContainer);

export default Connected;
