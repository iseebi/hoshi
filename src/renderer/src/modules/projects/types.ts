import { SmalledProject as _SmalledProject } from '../../../../models';
import { initialLoadableValue, LoadableValue } from '../models';

// Models
// ------------------------------

export type SmalledProject = _SmalledProject;

// State
// ------------------------------

export type ProjectsState = {
  project: LoadableValue<SmalledProject | undefined>;
  activePackage: string | null;
};

export const EmptyProjectsState: ProjectsState = {
  project: initialLoadableValue(),
  activePackage: null,
};
