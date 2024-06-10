import { PackagesRepository, ProjectsRepository } from '../../../engine/src/repositories';
import { errorResult, Result, successResult } from '../../../models';
import { CreateParameter } from '../models';

class PackagesUseCase {
  private readonly projectsRepository: ProjectsRepository;

  private readonly packagesRepository: PackagesRepository;

  public constructor(projectsRepository: ProjectsRepository, packagesRepository: PackagesRepository) {
    this.projectsRepository = projectsRepository;
    this.packagesRepository = packagesRepository;
  }

  public async processCreateAsync(parameter: CreateParameter): Promise<Result<void, string>> {
    const { project: projectPath } = parameter.options;

    const project = await this.projectsRepository.openProjectAsync(projectPath);
    if (!project) {
      return errorResult('Project not found');
    }

    await this.packagesRepository.addNewPackageAsync(parameter.name);

    return successResult(undefined);
  }
}

export default PackagesUseCase;
