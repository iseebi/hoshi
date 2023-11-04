import { createSelector } from '@reduxjs/toolkit';
import { EditableVersion, VersionsState } from './types';

type State = { versions: VersionsState };

export const selectEditingVersion = (state: State): EditableVersion | undefined => state.versions.editingVersion.value;
export const selectActiveVersion = (state: State): string | null => state.versions.activeVersion;
export const selectActiveEditingVersion = createSelector(
  selectEditingVersion,
  selectActiveVersion,
  (editingVersion, activeVersion): EditableVersion | undefined =>
    editingVersion?.id === activeVersion ? editingVersion : undefined,
);
