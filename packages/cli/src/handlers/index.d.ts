import { type Result } from "hoshi-models";
import type { CreatePackageParameter, CreateProjectParameter, CreateVersionParameter, PublishParameter } from "../models";
export declare const handlePublish: (parameter: PublishParameter) => Promise<Result<void, string>>;
export declare const handleCreateProject: (parameter: CreateProjectParameter) => Promise<Result<void, string>>;
export declare const handleCreatePackage: (parameter: CreatePackageParameter) => Promise<Result<void, string>>;
export declare const handleCreateVersion: (parameter: CreateVersionParameter) => Promise<Result<void, string>>;
