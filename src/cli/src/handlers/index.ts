import createModulesContainer from '../container';
import { CreateParameter, CreateProjectParameter, PublishParameter } from '../models';
import { Result } from '../../../models';

// eslint-disable-next-line import/prefer-default-export
export const handlePublish = async (parameter: PublishParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();
  return container.publish.processPublishAsync(parameter);
};

export const handleCreateProject = async (parameter: CreateProjectParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();
  return container.projects.processCreateAsync(parameter);
};

export const handleCreatePackage = async (parameter: CreateParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();
  return container.packages.processCreateAsync(parameter);
};

export const handleCreateVersion = async (parameter: CreateParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();
  return container.versions.processCreateAsync(parameter);
};
