import * as path from 'path';
import * as YAML from 'yaml';
import { Dirent, promises as fs } from 'fs';
import { PackageHeader, ProjectHeader, VersionFile } from '../../models';
import {
  FileHeader,
  PackageFileName,
  PackageFileType,
  ProjectFileName,
  ProjectFileType,
  VersionFileExt,
  VersionFileType,
} from '../../models/file';

class ProjectFile {
  private readonly projectDirectory: string;

  public constructor(projectFilePath: string) {
    this.projectDirectory = path.dirname(projectFilePath);
  }

  async readProjectHeaderAsync(): Promise<ProjectHeader> {
    const contents = await this.readYamlFileAsync<FileHeader & ProjectHeader>(ProjectFileName);
    if (contents.type !== ProjectFileType) {
      throw Error('Invalid Project');
    }
    return {
      id: contents.id,
      metadata: contents.metadata,
    };
  }

  async listPackagesAsync(): Promise<string[]> {
    const dirs = (await fs.readdir(this.projectDirectory, { withFileTypes: true }))
      .filter((entry: Dirent) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry: Dirent) => entry.name);
    return (await Promise.all(dirs.map(async (dir: string) => [dir, await this.isPackageAsync(dir)]))).map(
      (v) => v[0] as string,
    );
  }

  async addNewPackageAsync(packageId: string): Promise<void> {
    const packages = await this.listPackagesAsync();
    if (packages.find((v) => v === packageId)) {
      throw new Error('Directory already exists');
    }
    await this.makeDirectoryAsync(packageId);
    await this.writePackageHeaderAsync(packageId, {
      id: '',
      metadata: {},
    });
  }

  async writePackageHeaderAsync(packageId: string, contents: PackageHeader): Promise<void> {
    const fileName = path.join(packageId, PackageFileName);
    await this.writeYamlFileAsync<FileHeader & Omit<PackageHeader, 'id'>>(fileName, {
      type: PackageFileType,
      metadata: contents.metadata,
    });
  }

  async readPackageHeaderAsync(packageId: string): Promise<PackageHeader> {
    const fileName = path.join(packageId, PackageFileName);
    const contents = await this.readYamlFileAsync<FileHeader & PackageHeader>(fileName);
    if (contents.type !== PackageFileType) {
      throw Error('Invalid Package');
    }
    return {
      id: packageId,
      metadata: contents.metadata,
    };
  }

  private async isPackageAsync(dirName: string): Promise<boolean> {
    try {
      const fileName = path.join(dirName, PackageFileName);
      const contents = await this.readYamlFileAsync<FileHeader>(fileName);
      return contents.type === PackageFileType;
    } catch {
      return false;
    }
  }

  async listVersionsAsync(packageId: string): Promise<string[]> {
    const packageDir = path.join(this.projectDirectory, packageId);
    const versions = (await fs.readdir(packageDir, { withFileTypes: true }))
      .filter(
        (entry: Dirent) =>
          !entry.isDirectory() &&
          !entry.name.startsWith('.') &&
          path.extname(entry.name).toLowerCase() === VersionFileExt,
      )
      .map((entry: Dirent) => path.basename(entry.name, VersionFileExt));
    return versions.sort();
  }

  async listVersionsToVersionAsync(packageId: string, versionId: string): Promise<string[]> {
    const versions = await this.listVersionsAsync(packageId);
    const index = versions.findIndex((v) => {
      if (versionId === v) {
        return true;
      }
      const match = v.match(/^\d+_(.*)$/);
      // noinspection RedundantIfStatementJS
      if (match && match[1] === v) {
        return true;
      }
      return false;
    });
    if (index < 0) {
      return [];
    }
    return versions.slice(0, index + 1);
  }

  async readVersionAsync(packageId: string, versionId: string): Promise<VersionFile> {
    const fileName = path.join(packageId, `${versionId}${VersionFileExt}`);
    const contents = await this.readYamlFileAsync<FileHeader & VersionFile>(fileName);
    if (contents.type !== VersionFileType) {
      throw Error('Invalid Package');
    }
    return {
      id: versionId,
      metadata: contents.metadata,
      phrases: contents.phrases,
    };
  }

  async readHistoryMergedPhrasesAsync(
    packageId: string,
    versionIds: string[],
  ): Promise<Record<string, Record<string, string>>> {
    const histories = await Promise.all(versionIds.map((versionId) => this.readVersionAsync(packageId, versionId)));
    return histories.reduce(
      (prev, cur) => {
        const next = { ...prev };
        Object.keys(cur.phrases).forEach((key) => {
          if (!next[key]) {
            next[key] = cur.phrases[key];
            return;
          }
          next[key] = { ...next[key], ...cur.phrases[key] };
        });
        return next;
      },
      {} as Record<string, Record<string, string>>,
    );
  }

  async writeVersionFileAsync(packageId: string, versionId: string, contents: VersionFile): Promise<void> {
    const fileName = path.join(packageId, `${versionId}${VersionFileExt}`);
    await this.writeYamlFileAsync<FileHeader & Omit<VersionFile, 'id'>>(fileName, {
      type: VersionFileType,
      metadata: contents.metadata,
      phrases: contents.phrases,
    });
  }

  async deleteVersionFileAsync(packageId: string, versionId: string): Promise<void> {
    const fileName = path.join(packageId, `${versionId}${VersionFileExt}`);
    await this.deleteFileAsync(fileName);
  }

  private async readYamlFileAsync<T>(relativeFileName: string): Promise<T> {
    const targetPath = path.join(this.projectDirectory, relativeFileName);
    const contents = await fs.readFile(targetPath, { encoding: 'utf8' });
    return YAML.parse(contents) as T;
  }

  async writeYamlFileAsync<T>(relativeFileName: string, data: T): Promise<void> {
    const targetPath = path.join(this.projectDirectory, relativeFileName);
    const contents = YAML.stringify(data);
    await fs.writeFile(targetPath, contents);
  }

  private async deleteFileAsync(relativeFileName: string): Promise<void> {
    const targetPath = path.join(this.projectDirectory, relativeFileName);
    await fs.unlink(targetPath);
  }

  private async makeDirectoryAsync(relativeFileName: string): Promise<void> {
    const targetPath = path.join(this.projectDirectory, relativeFileName);
    await fs.mkdir(targetPath);
  }
}

export default ProjectFile;
