import { PackagesRepository, ProjectsRepository, VersionsRepository } from '../../../engine/src/repositories';
import { errorResult, Result, successResult } from '../../../models';

class VersionsUseCase {
  private readonly projectsRepository: ProjectsRepository;

  private readonly packagesRepository: PackagesRepository;

  private readonly versionsRepository: VersionsRepository;

  public constructor(
    projectsRepository: ProjectsRepository,
    packagesRepository: PackagesRepository,
    versionsRepository: VersionsRepository,
  ) {
    this.projectsRepository = projectsRepository;
    this.packagesRepository = packagesRepository;
    this.versionsRepository = versionsRepository;
  }

  public async processCreateAsync(projectPath: string, packageId: string, name: string): Promise<Result<void, string>> {
    const project = await this.projectsRepository.openProjectAsync(projectPath);
    if (!project) {
      return errorResult('Project not found');
    }

    if (!(await this.packagesRepository.isExistAsync(packageId))) {
      return errorResult('Package not found');
    }

    await this.versionsRepository.addNewVersionAsync(packageId, name);

    return successResult(undefined);
  }
}

export default VersionsUseCase;
