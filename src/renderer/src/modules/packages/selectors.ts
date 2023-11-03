import { createSelector } from '@reduxjs/toolkit';
import { ProjectsState } from '../projects';
import { PackagesState, SmalledPackage } from './types';
import { LoadableValue, LoadingState } from '../models';

type State = { packages: PackagesState; projects: ProjectsState };

const selectActivePackageName = (state: State): string | null => state.projects.activePackage;
export const selectPackage = (state: State): LoadableValue<SmalledPackage | undefined> => state.packages.package;

export const selectActivePackage = createSelector(selectActivePackageName, selectPackage, (packageName, pkg) => {
  if (!packageName || pkg.loadingState !== LoadingState.Initial || !pkg.value || pkg.value.id !== packageName) {
    return undefined;
  }
  return pkg.value;
});

export const selectActivePackageVersions = createSelector(selectActivePackage, (pkg): string[] => pkg?.versions ?? []);
