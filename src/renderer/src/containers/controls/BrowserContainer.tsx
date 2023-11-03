import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import Browser from '../../components/controls/Browser';
import { RootState } from '../../modules';
import { switchPackageAction } from '../../modules/projects';
import { clearPackagesStateAction, fetchPackageAction, selectActivePackageVersions } from '../../modules/packages';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  packages: string[];
  activePackage: string | null;
  versions: string[];
};

type DispatchProps = {
  dispatch: {
    switchPackage: (packageId: string | null) => void;
    clearPackagesState: () => void;
    fetchPackage: (packageId: string) => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const BrowserContainer: React.FC<Props> = ({ packages, activePackage, versions, dispatch }) => (
  <Browser
    packages={packages}
    activePackage={activePackage}
    versions={versions}
    onPackageSelect={(packageId): void => {
      dispatch.switchPackage(packageId);
      if (packageId) {
        dispatch.fetchPackage(packageId);
      } else {
        dispatch.clearPackagesState();
      }
    }}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  activePackage: state.projects.activePackage,
  packages: state.projects.project.value?.packages ?? [],
  versions: selectActivePackageVersions(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    switchPackage: (packageId) => dispatch(switchPackageAction({ packageId })),
    clearPackagesState: () => dispatch(clearPackagesStateAction()),
    fetchPackage: (packageId) => dispatch(fetchPackageAction({ packageId })),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(BrowserContainer);

export default Connected;
