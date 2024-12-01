import { ProjectFileName, type Result } from "hoshi-models";
import createModulesContainer from "../container";
import type {
  CreatePackageParameter,
  CreateProjectParameter,
  CreateVersionParameter,
  PublishParameter,
} from "../models";

export const handlePublish = async (parameter: PublishParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();
  return container.publish.processPublishAsync(parameter);
};

export const handleCreateProject = async (parameter: CreateProjectParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();

  const projectPath = parameter.options.project;
  if (!projectPath) {
    return { status: "error", error: "Project path is not defined" };
  }

  const { name } = parameter;
  if (!name) {
    return { status: "error", error: "Package name is not defined" };
  }

  return container.projects.processCreateAsync(projectPath, name);
};

export const handleCreatePackage = async (parameter: CreatePackageParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();

  const projectPath = parameter.options.project ?? parameter.context.project;
  if (!projectPath) {
    return { status: "error", error: "Project path is not defined" };
  }

  const { name } = parameter;
  if (!name) {
    return { status: "error", error: "Package name is not defined" };
  }

  const projectFilePath = container.fileSystem.pathJoin(projectPath, ProjectFileName);

  return container.packages.processCreateAsync(projectFilePath, name);
};

export const handleCreateVersion = async (parameter: CreateVersionParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();

  const projectPath = parameter.options.project ?? parameter.context.project;
  if (!projectPath) {
    return { status: "error", error: "Project path is not defined" };
  }

  const packageId = parameter.options.package ?? parameter.context.package;
  if (!packageId) {
    return { status: "error", error: "Package ID is not defined" };
  }

  const { name } = parameter;
  if (!name) {
    return { status: "error", error: "Version name is not defined" };
  }

  const projectFilePath = container.fileSystem.pathJoin(projectPath, ProjectFileName);

  return container.versions.processCreateAsync(projectFilePath, packageId, name);
};
