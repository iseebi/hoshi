import { createSelector } from '@reduxjs/toolkit';
import { EditableVersion, TranslationRow, VersionsState } from './types';

type State = { versions: VersionsState };

const EmptyLanguages: string[] = [];
const EmptyTranslationKeys: string[] = [];
const EmptyTranslationRows: TranslationRow[] = [];

export const selectEditingVersion = (state: State): EditableVersion | undefined => state.versions.editingVersion.value;
export const selectActiveVersion = (state: State): string | null => state.versions.activeVersion;
export const selectActiveEditingVersion = createSelector(
  selectEditingVersion,
  selectActiveVersion,
  (editingVersion, activeVersion): EditableVersion | undefined =>
    editingVersion?.id === activeVersion ? editingVersion : undefined,
);

export const selectHasActiveEditingVersion = createSelector(selectActiveEditingVersion, (editing) => Boolean(editing));

export const selectActiveLanguages = createSelector(
  selectActiveEditingVersion,
  (editing) => editing?.languages ?? EmptyLanguages,
);

export const selectActiveTranslationKeys = createSelector(
  selectActiveEditingVersion,
  (editing) => editing?.keys ?? EmptyTranslationKeys,
);

export const selectEditingTranslationRows = createSelector(
  selectActiveEditingVersion,
  selectActiveTranslationKeys,
  (editing, keys) =>
    editing
      ? keys.map(
          (key) =>
            ({
              id: key,
              currentPhrase: editing.phrases[key],
              historyPhrase: editing.historyPhrases[key],
            }) as TranslationRow,
        )
      : EmptyTranslationRows,
);
