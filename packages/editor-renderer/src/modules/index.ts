import { ProjectsState } from './projects';
import { PackagesState } from './packages';
import { VersionsState } from './versions';

export type RootState = {
  projects: ProjectsState;
  packages: PackagesState;
  versions: VersionsState;
};
