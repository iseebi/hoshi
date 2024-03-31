import I18NextConverter from '../../engine/src/converters/i18next';
import JsonConverter from '../../engine/src/converters/json';
import { PublishUseCase } from './usecases';
import {
  ContextRepository,
  PackagesRepository,
  ProjectsRepository,
  PublishRepository,
  VersionsRepository,
} from '../../engine/src/repositories';
import { ConverterDatastore, FilesDatastore, VariablesDatastore } from '../../engine/src/datastore';
import { AndroidXmlConverter, AppleStringsConverter } from '../../engine/src/converters';

type CliModulesContainer = {
  publish: PublishUseCase;
};

const createModulesContainer = (): CliModulesContainer => {
  const filesDatastore = new FilesDatastore();
  const converterDatastore = new ConverterDatastore([
    new AppleStringsConverter(),
    new AndroidXmlConverter(),
    new I18NextConverter(),
    new JsonConverter(),
  ]);
  const variablesDatastore = new VariablesDatastore();

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
    ),
  };
};

export default createModulesContainer;
