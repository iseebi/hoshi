import actionCreatorFactory from 'typescript-fsa';
import { createAsyncActionCreator } from '../actionCreatorsHelpers';
import { EditableVersion } from './types';

const actionCreator = actionCreatorFactory('Versions');

export const clearVersionStateAction = actionCreator('clearVersionState');
export const switchVersionAction = actionCreator<{
  packageId: string;
  versionId: string;
}>('switchVersion');
export const [fetchEditableVersionAction, fetchEditableVersionProgressAction] = createAsyncActionCreator<
  {
    packageId: string;
    versionId: string;
  },
  EditableVersion,
  Error
>(actionCreator, 'loadVersion');
export const [updateVersionAction, updateVersionProgressAction] = createAsyncActionCreator<
  {
    packageId: string;
    versionId: string;
    data: EditableVersion;
  },
  void,
  Error
>(actionCreator, 'updateVersion');
