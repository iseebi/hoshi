import { reducerWithInitialState } from "typescript-fsa-reducers";
import { registerProgressAction } from "../actionCreatorsHelpers";
import { initialLoadableValue } from "../models";
import { clearPackagesStateAction, fetchPackageProgressAction, switchPackageAction } from "./actions";
import { EmptyPackagesState } from "./types";

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
