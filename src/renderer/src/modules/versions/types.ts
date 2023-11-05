import { initialLoadableValue, LoadableValue } from '../models';
import { EditableVersion as _EditableVersion, Phrase as _Phrase } from '../../../../models';

// Models
// ------------------------------

// export type Version = _Version;
export type EditableVersion = _EditableVersion;
export type Phrase = _Phrase;

export type TranslationRow = {
  id: string;
  currentPhrase?: Phrase;
  historyPhrase?: Phrase;
};

export type NewVersionForm = {
  name: string;
};

// Compose Function
// ------------------------------

export const applyTranslationRow = (editing: EditableVersion, row: TranslationRow): EditableVersion => {
  if (!row.currentPhrase) {
    return editing;
  }
  const newPhrase = row.currentPhrase;
  return {
    ...editing,
    phrases: { ...editing.phrases, [row.id]: newPhrase },
  };
};

// State
// ------------------------------

export type VersionsState = {
  activeVersion: string | null;
  editingVersion: LoadableValue<EditableVersion | undefined>;
};

export const EmptyVersionState: VersionsState = {
  activeVersion: null,
  editingVersion: initialLoadableValue(),
};
