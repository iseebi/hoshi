import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EmptyProjectsState } from './types';
import { registerProgressAction } from '../actionCreatorsHelpers';
import { fetchCurrentProjectProgressAction } from './actions';

const reducer = reducerWithInitialState({ ...EmptyProjectsState });

registerProgressAction(reducer, fetchCurrentProjectProgressAction, (state, { value }) => ({
  ...state,
  project: value,
}));

export default reducer;
