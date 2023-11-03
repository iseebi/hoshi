import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EmptyProjectsState } from './types';
import { registerProgressAction } from '../actionCreatorsHelpers';
import { fetchCurrentProjectProgressAction, openProjectProgressAction, switchPackageAction } from './actions';

const reducer = reducerWithInitialState({ ...EmptyProjectsState });

registerProgressAction(reducer, fetchCurrentProjectProgressAction, (state, { value }) => ({
  ...state,
  project: value,
}));

registerProgressAction(reducer, openProjectProgressAction, (state, { value }) => ({
  ...state,
  project: value,
  activePackage: null,
}));

reducer.case(switchPackageAction, (state, { packageId }) => ({ ...state, activePackage: packageId }));

export default reducer;
