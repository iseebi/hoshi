import { PublishUseCase } from './usecases';
import {
  PackagesRepository,
  ProjectsRepository,
  PublishRepository,
  VersionsRepository,
} from '../../engine/src/repositories';
import { ConverterDatastore, FilesDatastore } from '../../engine/src/datastore';
import { AndroidXmlConverter, AppleStringsConverter } from '../../engine/src/converters';

type CliModulesContainer = {
  publish: PublishUseCase;
};

const createModulesContainer = (): CliModulesContainer => {
  const filesDatastore = new FilesDatastore();
  const converterDatastore = new ConverterDatastore([new AppleStringsConverter(), new AndroidXmlConverter()]);

  const projectsRepository = new ProjectsRepository(filesDatastore);
  const packagesRepository = new PackagesRepository(filesDatastore);
  const versionsRepository = new VersionsRepository(filesDatastore);
  const publishRepository = new PublishRepository(converterDatastore);

  return {
    publish: new PublishUseCase(projectsRepository, packagesRepository, versionsRepository, publishRepository),
  };
};

export default createModulesContainer;
