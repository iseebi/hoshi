import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EmptyPackagesState } from './types';
import { registerProgressAction } from '../actionCreatorsHelpers';
import { clearPackagesStateAction, fetchPackageProgressAction, switchPackageAction } from './actions';
import { initialLoadableValue } from '../models';

const reducer = reducerWithInitialState({ ...EmptyPackagesState });

reducer.case(clearPackagesStateAction, (state) => ({
  ...state,
  package: initialLoadableValue(),
}));

registerProgressAction(reducer, fetchPackageProgressAction, (state, { value }) => ({
  ...state,
  package: value,
}));

reducer.case(switchPackageAction, (state, { packageId }) => ({ ...state, activePackage: packageId }));

export default reducer;
