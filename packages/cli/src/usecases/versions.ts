import type { PackagesRepository, ProjectsRepository, VersionsRepository } from "hoshi-core";
import { type Result, errorResult, successResult } from "hoshi-models";

class VersionsUseCase {
  public constructor(
    private projectsRepository: ProjectsRepository,
    private packagesRepository: PackagesRepository,
    private versionsRepository: VersionsRepository,
  ) {}

  public async processCreateAsync(projectPath: string, packageId: string, name: string): Promise<Result<void, string>> {
    const project = await this.projectsRepository.openProjectAsync(projectPath);
    if (!project) {
      return errorResult("Project not found");
    }

    if (!(await this.packagesRepository.isExistAsync(packageId))) {
      return errorResult("Package not found");
    }

    await this.versionsRepository.addNewVersionAsync(packageId, name);

    return successResult(undefined);
  }
}

export default VersionsUseCase;
