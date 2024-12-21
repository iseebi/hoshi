import { FilesDatastore, PackagesRepository, ProjectsRepository, VersionsRepository } from "hoshi-core";
import { FileSystemImpl } from "../../platform";
import { PackagesUseCase, ProjectsUseCase, VersionsUseCase } from "./usecases";

type ApiModulesContainer = {
  projects: ProjectsUseCase;
  packages: PackagesUseCase;
  versions: VersionsUseCase;
};

const createModulesContainer: () => ApiModulesContainer = () => {
  const fileSystem = new FileSystemImpl();
  const filesDatastore = new FilesDatastore(fileSystem);

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
