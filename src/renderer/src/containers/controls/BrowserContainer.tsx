import React from 'react';
import { connect } from 'react-redux';
import Browser from '../../components/controls/Browser';
import { RootState } from '../../modules';
import { Dispatch } from '@reduxjs/toolkit';
import { switchPackageAction } from '../../modules/projects';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  packages: string[];
  activePackage: string | null;
};

type DispatchProps = {
  dispatch: {
    switchPackage: (packageId: string | null) => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const BrowserContainer: React.FC<Props> = ({ packages, activePackage, dispatch }) => (
  <Browser
    packages={packages}
    activePackage={activePackage}
    onPackageSelect={(packageId): void => dispatch.switchPackage(packageId)}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  activePackage: state.projects.activePackage,
  packages: state.projects.project.value?.packages ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    switchPackage: (packageId) => dispatch(switchPackageAction({ packageId })),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(BrowserContainer);

export default Connected;
