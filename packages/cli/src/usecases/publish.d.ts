import { type ContextRepository, type FileSystem, type PackagesRepository, type ProjectsRepository, type PublishRepository, type VersionsRepository } from "hoshi-core";
import { type Result } from "hoshi-models";
import type { PublishParameter } from "../models";
declare class PublishUseCase {
    private projectsRepository;
    private packagesRepository;
    private versionsRepository;
    private publishRepository;
    private contextRepository;
    private fileSystem;
    constructor(projectsRepository: ProjectsRepository, packagesRepository: PackagesRepository, versionsRepository: VersionsRepository, publishRepository: PublishRepository, contextRepository: ContextRepository, fileSystem: FileSystem);
    processPublishAsync(parameter: PublishParameter): Promise<Result<void, string>>;
}
export default PublishUseCase;
