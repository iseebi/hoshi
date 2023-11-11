import { SmalledProject } from '../../../models';
import ProjectsRepository from '../../../engine/src/repositories/projects';

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
