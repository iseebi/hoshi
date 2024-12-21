import type { SmalledProject as _SmalledProject } from "hoshi-models";
import { type LoadableValue, initialLoadableValue } from "../models";

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
