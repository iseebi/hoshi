import actionCreatorFactory from 'typescript-fsa';
import { createAsyncActionCreator } from '../actionCreatorsHelpers';
import { SmalledPackage } from './types';

const actionCreator = actionCreatorFactory('Packages');

export const clearPackagesStateAction = actionCreator('clearPackagesState');

export const [fetchPackageAction, fetchPackageProgressAction] = createAsyncActionCreator<
  {
    packageId: string;
  },
  SmalledPackage,
  Error
>(actionCreator, 'fetchPackage');
