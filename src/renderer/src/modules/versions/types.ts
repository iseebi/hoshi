import { initialLoadableValue, LoadableValue } from '../models';
import { Version as _Version, EditableVersion as _EditableVersion } from '../../../../models';

// Models
// ------------------------------

export type Version = _Version;
export type EditableVersion = _EditableVersion;

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
