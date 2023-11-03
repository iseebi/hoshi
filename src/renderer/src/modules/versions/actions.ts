import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('Versions');

export const clearVersionStateAction = actionCreator('clearVersionState');
export const switchVersionAction = actionCreator<{
  packageId: string;
  versionId: string;
}>('switchVersion');
