import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import Browser from '../../components/controls/Browser';
import { RootState } from '../../modules';
import {
  clearPackagesStateAction,
  fetchPackageAction,
  selectActivePackage,
  selectActivePackageVersions,
  SmalledPackage,
  switchPackageAction,
} from '../../modules/packages';
import { clearVersionStateAction, switchVersionAction } from '../../modules/versions';
import { usePrevious } from '../sideEffects';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  packages: string[];
  activePackage: string | null;
  package: SmalledPackage | undefined;
  versions: string[];
  activeVersion: string | null;
};

type DispatchProps = {
  dispatch: {
    switchPackage: (packageId: string | null) => void;
    clearPackagesState: () => void;
    fetchPackage: (packageId: string) => void;
    switchVersion: (packageId: string, versionId: string) => void;
    clearVersionsState: () => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const BrowserContainer: React.FC<Props> = ({
  packages,
  activePackage,
  package: pkg,
  versions,
  activeVersion,
  dispatch,
}) => {
  const previousPkg = usePrevious(pkg);

  useEffect(() => {
    dispatch.clearVersionsState();
    if (!pkg || pkg.versions.length === 0 || pkg === previousPkg) {
      return;
    }
    if (!activePackage) {
      return;
    }
    dispatch.switchVersion(activePackage, pkg.versions[0]);
  }, [pkg, previousPkg, activePackage, dispatch]);
  return (
    <Browser
      packages={packages}
      activePackage={activePackage}
      versions={versions}
      activeVersion={activeVersion}
      onPackageSelect={(packageId): void => {
        dispatch.switchPackage(packageId);
        if (packageId) {
          dispatch.fetchPackage(packageId);
        } else {
          dispatch.clearPackagesState();
        }
      }}
      onVersionSelect={(versionId): void => {
        if (!activePackage) {
          return;
        }
        dispatch.switchVersion(activePackage, versionId);
      }}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  activePackage: state.packages.activePackage,
  packages: state.projects.project.value?.packages ?? [],
  package: selectActivePackage(state),
  versions: selectActivePackageVersions(state),
  activeVersion: state.versions.activeVersion,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    switchPackage: (packageId) => dispatch(switchPackageAction({ packageId })),
    clearPackagesState: () => dispatch(clearPackagesStateAction()),
    fetchPackage: (packageId) => dispatch(fetchPackageAction({ packageId })),
    switchVersion: (packageId, versionId) => dispatch(switchVersionAction({ packageId, versionId })),
    clearVersionsState: () => dispatch(clearVersionStateAction()),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(BrowserContainer);

export default Connected;
