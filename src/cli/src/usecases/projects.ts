import { ProjectsRepository } from '../../../engine/src/repositories';
import { errorResult, Result, successResult } from '../../../models';
import { CreateProjectParameter } from '../models';

class ProjectsUseCase {
  private readonly projectsRepository: ProjectsRepository;

  constructor(projectsRepository: ProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async processCreateAsync(parameter: CreateProjectParameter): Promise<Result<void, string>> {
    const { project: projectPath } = parameter.options;

    const result = await this.projectsRepository.createProjectAsync(projectPath, parameter.name);
    if (result.status === 'error') {
      switch (result.error.type) {
        case 'alreadyExists':
          return errorResult('Project already exists');
        case 'exception':
          return errorResult(result.error.error.message);
        case 'unknown':
        default:
          return errorResult('Unknown error');
      }
    }

    return successResult(undefined);
  }
}

export default ProjectsUseCase;
