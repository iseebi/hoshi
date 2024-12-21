import type { Action } from "typescript-fsa";

export type Dispatch = <T>(action: Action<T>) => void;
