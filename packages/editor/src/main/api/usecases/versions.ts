import { VersionsRepository } from '../../../engine/src/repositories';
import { EditableVersion, Result, Version } from '../../../models';
import { FileLoadError } from '../../../models/file';

class VersionsUseCase {
  private versionsRepository: VersionsRepository;

  public constructor(versionsRepository: VersionsRepository) {
    this.versionsRepository = versionsRepository;
  }

  fetchEditableVersionAsync(packageId: string, versionId: string): Promise<Result<EditableVersion, FileLoadError>> {
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
