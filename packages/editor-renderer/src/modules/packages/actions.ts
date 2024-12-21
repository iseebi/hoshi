import actionCreatorFactory from "typescript-fsa";
import { createAsyncActionCreator } from "../actionCreatorsHelpers";
import type { SmalledPackage } from "./types";

const actionCreator = actionCreatorFactory("Packages");

export const clearPackagesStateAction = actionCreator("clearPackagesState");

export const switchPackageAction = actionCreator<{
  packageId: string | null;
}>("switchPackage");

export const [fetchPackageAction, fetchPackageProgressAction] = createAsyncActionCreator<
  {
    packageId: string;
  },
  SmalledPackage,
  Error
>(actionCreator, "fetchPackage");
export const [addPackageAction, addPackageProgressAction] = createAsyncActionCreator<
  {
    packageId: string;
  },
  void,
  Error
>(actionCreator, "addPackage");
