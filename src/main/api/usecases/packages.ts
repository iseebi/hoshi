import { SmalledPackage } from '../../../models';
import { PackagesRepository } from '../repositories';

class PackagesUseCase {
  private packagesRepository: PackagesRepository;

  public constructor(packagesRepository: PackagesRepository) {
    this.packagesRepository = packagesRepository;
  }

  fetchPackageAsync(packageId: string): Promise<SmalledPackage | undefined> {
    return this.packagesRepository.fetchPackageAsync(packageId);
  }
}

export default PackagesUseCase;
