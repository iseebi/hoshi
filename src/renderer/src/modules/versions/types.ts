// Models
// ------------------------------

// State
// ------------------------------

export type VersionsState = {
  activeVersion: string | null;
};

export const EmptyVersionState: VersionsState = {
  activeVersion: null,
};
