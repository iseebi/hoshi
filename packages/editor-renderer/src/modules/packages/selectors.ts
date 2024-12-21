import { createSelector } from "@reduxjs/toolkit";
import { type LoadableValue, LoadingState } from "../models";
import type { ProjectsState } from "../projects";
import type { PackagesState, SmalledPackage } from "./types";

type State = { packages: PackagesState; projects: ProjectsState };

export const selectActivePackageName = (state: State): string | null => state.packages.activePackage;
export const selectPackage = (state: State): LoadableValue<SmalledPackage | undefined> => state.packages.package;

export const selectActivePackage = createSelector(selectActivePackageName, selectPackage, (packageName, pkg) => {
  if (!packageName || pkg.loadingState !== LoadingState.Initial || !pkg.value || pkg.value.id !== packageName) {
    return undefined;
  }
  return pkg.value;
});

export const selectActivePackageVersions = createSelector(selectActivePackage, (pkg): string[] => pkg?.versions ?? []);

export const selectNextVersionPrefix = createSelector(selectActivePackageVersions, (versions) => {
  if (versions.length === 0) {
    return "0000000_initial";
  }
  const lastVersion = versions[0];
  const match = lastVersion.match(/^(\d+)_.*$/);
  // noinspection RedundantIfStatementJS
  if (!match) {
    return "";
  }
  const versionNum = (Math.floor(Number.parseInt(match[1], 10) / 1000) + 1) * 1000;
  return `${`${versionNum}`.padStart(7, "0")}_`;
});
