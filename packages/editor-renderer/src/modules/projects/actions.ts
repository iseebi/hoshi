import actionCreatorFactory from "typescript-fsa";
import { createAsyncActionCreator } from "../actionCreatorsHelpers";
import type { SmalledProject } from "./types";

const actionCreator = actionCreatorFactory("Projects");

export const [fetchCurrentProjectAction, fetchCurrentProjectProgressAction] = createAsyncActionCreator<
  void,
  SmalledProject,
  Error
>(actionCreator, "fetchCurrentProject");

export const [openProjectAction, openProjectProgressAction] = createAsyncActionCreator<void, SmalledProject, Error>(
  actionCreator,
  "openProject",
);
