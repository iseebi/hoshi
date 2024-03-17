import createModulesContainer from '../container';
import { PublishParameter } from '../models';
import { Result } from '../../../models';

// eslint-disable-next-line import/prefer-default-export
export const handlePublish = async (parameter: PublishParameter): Promise<Result<void, string>> => {
  const container = createModulesContainer();
  return container.publish.processPublishAsync(parameter);
};
