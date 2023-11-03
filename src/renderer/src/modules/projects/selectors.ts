import { createSelector } from '@reduxjs/toolkit';
import { ProjectsState, SmalledProject } from './types';
import { LoadingState } from '../models';

type State = { projects: ProjectsState };

export const selectCurrentProject = (state: State): SmalledProject | undefined =>
  state.projects.project.loadingState === LoadingState.Initial ? state.projects.project.value : undefined;

export const selectHasCurrentProject = createSelector(selectCurrentProject, (project) => Boolean(project));
