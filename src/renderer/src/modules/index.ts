import { ProjectsState } from './projects';
import { PackagesState } from './packages';

export type RootState = {
  projects: ProjectsState;
  packages: PackagesState;
};
