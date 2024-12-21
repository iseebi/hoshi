import {
  AndroidXmlConverter,
  AppleStringsConverter,
  ContextRepository,
  ConverterDatastore,
  type FileSystem,
  FilesDatastore,
  HoshiVersionConverter,
  I18NextConverter,
  JsonConverter,
  NextIntlConverter,
  PackagesRepository,
  ProjectsRepository,
  PublishRepository,
  VariablesDatastore,
  VersionsRepository,
} from "hoshi-core";
import { FileSystemImpl, PlatformImpl } from "./platform";
import { PackagesUseCase, ProjectsUseCase, PublishUseCase, VersionsUseCase } from "./usecases";

type CliModulesContainer = {
  publish: PublishUseCase;
  projects: ProjectsUseCase;
  packages: PackagesUseCase;
  versions: VersionsUseCase;
  fileSystem: FileSystem;
};

const createModulesContainer = (): CliModulesContainer => {
  const fileSystem = new FileSystemImpl();
  const platform = new PlatformImpl();

  const filesDatastore = new FilesDatastore(fileSystem);
  const converterDatastore = new ConverterDatastore([
    new AppleStringsConverter(fileSystem),
    new AndroidXmlConverter(fileSystem),
    new I18NextConverter(fileSystem),
    new JsonConverter(fileSystem),
    new NextIntlConverter(fileSystem),
    new HoshiVersionConverter(fileSystem),
  ]);
  const variablesDatastore = new VariablesDatastore(platform);

  const projectsRepository = new ProjectsRepository(filesDatastore);
  const packagesRepository = new PackagesRepository(filesDatastore);
  const versionsRepository = new VersionsRepository(filesDatastore);
  const publishRepository = new PublishRepository(converterDatastore);
  const contextRepository = new ContextRepository(variablesDatastore);

  return {
    publish: new PublishUseCase(
      projectsRepository,
      packagesRepository,
      versionsRepository,
      publishRepository,
      contextRepository,
      fileSystem,
    ),
    packages: new PackagesUseCase(projectsRepository, packagesRepository),
    projects: new ProjectsUseCase(projectsRepository),
    versions: new VersionsUseCase(projectsRepository, packagesRepository, versionsRepository),
    fileSystem,
  };
};

export default createModulesContainer;
