import { SmalledPackage } from '../../../models';
import { PackagesRepository } from '../../../engine/src/repositories';

class PackagesUseCase {
  private packagesRepository: PackagesRepository;

  public constructor(packagesRepository: PackagesRepository) {
    this.packagesRepository = packagesRepository;
  }

  fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined> {
    return this.packagesRepository.fetchPackageAsync(packageId);
  }

  addNewPackageAsync(packageId: string): Promise<void> {
    return this.packagesRepository.addNewPackageAsync(packageId);
  }
}

export default PackagesUseCase;
