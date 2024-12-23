import type { ProjectsRepository } from "hoshi-core";
import type { SmalledProject } from "hoshi-models";

class ProjectsUseCase {
  private projectsRepository: ProjectsRepository;

  public constructor(projectsRepository: ProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  openProjectAsync(path: string): Promise<SmalledProject | undefined> {
    return this.projectsRepository.openProjectAsync(path);
  }

  fetchCurrentProjectAsync(): Promise<SmalledProject | undefined> {
    return this.projectsRepository.fetchCurrentProjectAsync();
  }
}

export default ProjectsUseCase;
