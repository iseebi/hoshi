import actionCreatorFactory from 'typescript-fsa';
import { createAsyncActionCreator } from '../actionCreatorsHelpers';
import { SmalledProject } from './types';

const actionCreator = actionCreatorFactory('Projects');

export const [fetchCurrentProjectAction, fetchCurrentProjectProgressAction] = createAsyncActionCreator<
  void,
  SmalledProject,
  Error
>(actionCreator, 'loadMyPageData');
