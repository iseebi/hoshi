import { ProjectsUseCase } from './usecases';
import { ProjectsRepository } from './repositories';
import { FilesDatastore } from './datastore';

type ApiModulesContainer = {
  projects: ProjectsUseCase;
};

const createModulesContainer: () => ApiModulesContainer = () => {
  const filesDatastore = new FilesDatastore();

  const projectsRepository = new ProjectsRepository(filesDatastore);

  return {
    projects: new ProjectsUseCase(projectsRepository),
  };
};

export default createModulesContainer;
