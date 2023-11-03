import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EmptyPackagesState } from './types';
import { registerProgressAction } from '../actionCreatorsHelpers';
import { clearPackagesStateAction, fetchPackageProgressAction } from './actions';
import { initialLoadableValue } from '../models';

const reducer = reducerWithInitialState({ ...EmptyPackagesState });

reducer.case(clearPackagesStateAction, (state) => ({
  ...state,
  package: initialLoadableValue(),
  selectedVersion: null,
}));

registerProgressAction(reducer, fetchPackageProgressAction, (state, { value }) => ({
  ...state,
  package: value,
}));

export default reducer;
