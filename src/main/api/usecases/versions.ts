import { VersionsRepository } from '../../../engine/src/repositories';
import { EditableVersion, Version } from '../../../models';

class VersionsUseCase {
  private versionsRepository: VersionsRepository;

  public constructor(versionsRepository: VersionsRepository) {
    this.versionsRepository = versionsRepository;
  }

  fetchEditableVersionAsync(packageId: string, versionId: string): Promise<EditableVersion | undefined> {
    return this.versionsRepository.fetchEditableVersionAsync(packageId, versionId);
  }

  addNewVersionAsync(packageId: string, versionId: string): Promise<void> {
    return this.versionsRepository.addNewVersionAsync(packageId, versionId);
  }

  deleteVersionAsync(packageId: string, versionId: string): Promise<void> {
    return this.versionsRepository.deleteVersionAsync(packageId, versionId);
  }

  updateVersionAsync(packageId: string, versionId: string, data: Version): Promise<void> {
    return this.versionsRepository.updateVersionAsync(packageId, versionId, data);
  }
}

export default VersionsUseCase;
