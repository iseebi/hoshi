import { type FileSystem } from "hoshi-core";
import { PackagesUseCase, ProjectsUseCase, PublishUseCase, VersionsUseCase } from "./usecases";
type CliModulesContainer = {
    publish: PublishUseCase;
    projects: ProjectsUseCase;
    packages: PackagesUseCase;
    versions: VersionsUseCase;
    fileSystem: FileSystem;
};
declare const createModulesContainer: () => CliModulesContainer;
export default createModulesContainer;
