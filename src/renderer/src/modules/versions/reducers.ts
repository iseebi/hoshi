import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { switchVersionAction } from './actions';
import { EmptyVersionState } from './types';

const reducer = reducerWithInitialState({ ...EmptyVersionState });

reducer.case(switchVersionAction, (state, { versionId }) => ({ ...state, activeVersion: versionId }));

export default reducer;
