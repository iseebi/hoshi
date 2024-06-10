import { ProjectsRepository, VersionsRepository } from '../../../engine/src/repositories';
import { errorResult, Result, successResult } from '../../../models';
import { CreateParameter } from '../models';

class VersionsUseCase {
  private readonly projectsRepository: ProjectsRepository;

  private readonly versionsRepository: VersionsRepository;

  public constructor(projectsRepository: ProjectsRepository, versionsRepository: VersionsRepository) {
    this.projectsRepository = projectsRepository;
    this.versionsRepository = versionsRepository;
  }

  public async processCreateAsync(parameter: CreateParameter): Promise<Result<void, string>> {
    const { project: projectPath } = parameter.options;

    const project = await this.projectsRepository.openProjectAsync(projectPath);
    if (!project) {
      return errorResult('Project not found');
    }

    await this.versionsRepository.addNewVersionAsync(project.id, parameter.name);

    return successResult(undefined);
  }
}

export default VersionsUseCase;
