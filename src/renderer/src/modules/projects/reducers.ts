import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EmptyProjectsState } from './types';
import { registerProgressAction } from '../actionCreatorsHelpers';
import { fetchCurrentProjectProgressAction, openProjectProgressAction, switchPackageAction } from './actions';
import { LoadingState } from '../models';

const reducer = reducerWithInitialState({ ...EmptyProjectsState });

registerProgressAction(reducer, fetchCurrentProjectProgressAction, (state, { value }) => ({
  ...state,
  project: value,
}));

registerProgressAction(reducer, openProjectProgressAction, (state, { value }) => ({
  ...state,
  project: {
    loadingState: value.loadingState,
    value: value.loadingState === LoadingState.Initial ? value.value ?? state.project?.value : state.project?.value,
  },
  activePackage: value.loadingState === LoadingState.Initial && value.value ? null : state.activePackage,
}));

reducer.case(switchPackageAction, (state, { packageId }) => ({ ...state, activePackage: packageId }));

export default reducer;
