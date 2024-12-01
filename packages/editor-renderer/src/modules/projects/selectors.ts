import { createSelector } from "@reduxjs/toolkit";
import type { ProjectsState, SmalledProject } from "./types";

type State = { projects: ProjectsState };

export const selectCurrentProject = (state: State): SmalledProject | undefined => state.projects.project.value;

export const selectHasCurrentProject = createSelector(selectCurrentProject, (project) => Boolean(project));
