import { initialLoadableValue, LoadableValue } from '../models';
import { SmalledPackage as _SmalledPackage } from '../../../../models';

// Models
// ------------------------------

export type SmalledPackage = _SmalledPackage;

export type NewPackageForm = {
  name: string;
};

// State
// ------------------------------

export type PackagesState = {
  package: LoadableValue<SmalledPackage>;
  activePackage: string | null;
};

export const EmptyPackagesState: PackagesState = {
  package: initialLoadableValue(),
  activePackage: null,
};
