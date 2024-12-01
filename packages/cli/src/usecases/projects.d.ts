import type { ProjectsRepository } from "hoshi-core";
import { type Result } from "hoshi-models";
declare class ProjectsUseCase {
    private readonly projectsRepository;
    constructor(projectsRepository: ProjectsRepository);
    processCreateAsync(projectPath: string, name: string): Promise<Result<void, string>>;
}
export default ProjectsUseCase;
