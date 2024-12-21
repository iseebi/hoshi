import type { ProjectsRepository } from "hoshi-core";
import { type Result, errorResult, successResult } from "hoshi-models";

class ProjectsUseCase {
  private readonly projectsRepository: ProjectsRepository;

  constructor(projectsRepository: ProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async processCreateAsync(projectPath: string, name: string): Promise<Result<void, string>> {
    const result = await this.projectsRepository.createProjectAsync(projectPath, name);
    if (result.status === "error") {
      switch (result.error.type) {
        case "alreadyExists":
          return errorResult("Project already exists");
        case "exception":
          return errorResult(result.error.error.message);
        case "unknown":
          return errorResult("Unknown error");
        default:
          return errorResult("Unknown error");
      }
    }

    return successResult(undefined);
  }
}

export default ProjectsUseCase;
