import { initialLoadableValue, LoadableValue } from '../models';
import { SmalledPackage as _SmalledPackage } from '../../../../models';

// Models
// ------------------------------

export type SmalledPackage = _SmalledPackage;

// State
// ------------------------------

export type PackagesState = {
  package: LoadableValue<SmalledPackage>;
};

export const EmptyPackagesState: PackagesState = {
  package: initialLoadableValue(),
};
