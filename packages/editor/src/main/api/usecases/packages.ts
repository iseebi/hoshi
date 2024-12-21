import type { PackagesRepository } from "hoshi-core";
import type { SmalledPackage } from "hoshi-models";

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
