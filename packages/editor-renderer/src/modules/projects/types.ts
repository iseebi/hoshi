import { SmalledProject as _SmalledProject } from '../../../../models';
import { initialLoadableValue, LoadableValue } from '../models';

// Models
// ------------------------------

export type SmalledProject = _SmalledProject;

// State
// ------------------------------

export type ProjectsState = {
  project: LoadableValue<SmalledProject | undefined>;
};

export const EmptyProjectsState: ProjectsState = {
  project: initialLoadableValue(),
};
