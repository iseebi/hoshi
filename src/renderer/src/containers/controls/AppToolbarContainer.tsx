import React from 'react';
import { connect } from 'react-redux';
import AppToolbar from '../../components/controls/AppToolbar';
import { selectHasCurrentProject } from '../../modules/projects';
import { RootState } from '../../modules';
import { selectHasActiveEditingVersion } from '../../modules/versions';
import AddVersionDialogContainer from '../dialog/AddVersionDialogContainer';
import AddPackageDialogContainer from '../dialog/AddPackageDialogContainer';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  hasActiveProject: boolean;
  hasActiveVersion: boolean;
};

type DispatchProps = {
  /*
  dispatch: {
  };
   */
};

type Props = ExportProps & StateProps & DispatchProps;

const RenderAddPackageDialogContainer = (close: () => void): React.ReactElement => (
  <AddPackageDialogContainer close={close} />
);

const RenderAddVersionDialogContainer = (close: () => void): React.ReactElement => (
  <AddVersionDialogContainer close={close} />
);

const AppToolbarContainer: React.FC<Props> = ({ hasActiveProject, hasActiveVersion }) => (
  <AppToolbar
    hasActiveProject={hasActiveProject}
    hasActiveVersion={hasActiveVersion}
    addPackageDialog={RenderAddPackageDialogContainer}
    addVersionDialog={RenderAddVersionDialogContainer}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  hasActiveProject: selectHasCurrentProject(state),
  hasActiveVersion: selectHasActiveEditingVersion(state),
});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({
  /*
  dispatch: {
  },
   */
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AppToolbarContainer);

export default Connected;
