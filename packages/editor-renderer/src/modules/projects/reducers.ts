import { reducerWithInitialState } from "typescript-fsa-reducers";
import { registerProgressAction } from "../actionCreatorsHelpers";
import { LoadingState } from "../models";
import { fetchCurrentProjectProgressAction, openProjectProgressAction } from "./actions";
import { EmptyProjectsState } from "./types";

const reducer = reducerWithInitialState({ ...EmptyProjectsState });

registerProgressAction(reducer, fetchCurrentProjectProgressAction, (state, { value }) => ({
  ...state,
  project: value,
}));

registerProgressAction(reducer, openProjectProgressAction, (state, { value }) => ({
  ...state,
  project: {
    loadingState: value.loadingState,
    value: value.loadingState === LoadingState.Initial ? (value.value ?? state.project?.value) : state.project?.value,
  },
}));

export default reducer;
