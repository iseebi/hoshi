import type { PackagesRepository, ProjectsRepository, VersionsRepository } from "hoshi-core";
import { type Result } from "hoshi-models";
declare class VersionsUseCase {
    private projectsRepository;
    private packagesRepository;
    private versionsRepository;
    constructor(projectsRepository: ProjectsRepository, packagesRepository: PackagesRepository, versionsRepository: VersionsRepository);
    processCreateAsync(projectPath: string, packageId: string, name: string): Promise<Result<void, string>>;
}
export default VersionsUseCase;
