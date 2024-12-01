import type { PackagesRepository, ProjectsRepository } from "hoshi-core";
import { type Result } from "hoshi-models";
declare class PackagesUseCase {
    private readonly projectsRepository;
    private readonly packagesRepository;
    constructor(projectsRepository: ProjectsRepository, packagesRepository: PackagesRepository);
    processCreateAsync(projectPath: string, name: string): Promise<Result<void, string>>;
}
export default PackagesUseCase;
