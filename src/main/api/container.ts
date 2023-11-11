import { PackagesUseCase, ProjectsUseCase, VersionsUseCase } from './usecases';
import { PackagesRepository, ProjectsRepository, VersionsRepository } from '../../engine/src/repositories';
import { FilesDatastore } from '../../engine/src/datastore';

type ApiModulesContainer = {
  projects: ProjectsUseCase;
  packages: PackagesUseCase;
  versions: VersionsUseCase;
};

const createModulesContainer: () => ApiModulesContainer = () => {
  const filesDatastore = new FilesDatastore();

  const projectsRepository = new ProjectsRepository(filesDatastore);
  const packagesRepository = new PackagesRepository(filesDatastore);
  const versionsRepository = new VersionsRepository(filesDatastore);

  return {
    projects: new ProjectsUseCase(projectsRepository),
    packages: new PackagesUseCase(packagesRepository),
    versions: new VersionsUseCase(versionsRepository),
  };
};

export default createModulesContainer;
