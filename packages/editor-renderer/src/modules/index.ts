import type { PackagesState } from "./packages";
import type { ProjectsState } from "./projects";
import type { VersionsState } from "./versions";

export type RootState = {
  projects: ProjectsState;
  packages: PackagesState;
  versions: VersionsState;
};
