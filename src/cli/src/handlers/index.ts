import createModulesContainer from '../container';
import { PublishParameter } from '../models';

// eslint-disable-next-line import/prefer-default-export
export const handlePublish = async (parameter: PublishParameter): Promise<void> => {
  const container = createModulesContainer();
  await container.publish.processPublishAsync(parameter);
};
