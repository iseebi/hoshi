import { PackagesUseCase, ProjectsUseCase } from './usecases';
import { PackagesRepository, ProjectsRepository } from './repositories';
import { FilesDatastore } from './datastore';

type ApiModulesContainer = {
  projects: ProjectsUseCase;
  packages: PackagesUseCase;
};

const createModulesContainer: () => ApiModulesContainer = () => {
  const filesDatastore = new FilesDatastore();

  const projectsRepository = new ProjectsRepository(filesDatastore);
  const packagesRepository = new PackagesRepository(filesDatastore);

  return {
    projects: new ProjectsUseCase(projectsRepository),
    packages: new PackagesUseCase(packagesRepository),
  };
};

export default createModulesContainer;
