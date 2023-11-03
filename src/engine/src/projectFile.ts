import * as path from 'path';
import * as YAML from 'yaml';
import { Dirent } from 'fs';
import { ProjectHeader } from '../../models';
import { FileHeader, ProjectFileType } from '../../models/file';

const fs = require('fs').promises;

class ProjectFile {
  private readonly projectDirectory: string;

  public constructor(projectFilePath: string) {
    this.projectDirectory = path.dirname(projectFilePath);
  }

  async readProjectHeaderAsync(): Promise<ProjectHeader> {
    const contents = await this.readYamlFileAsync<FileHeader & ProjectHeader>('project.hoshi');
    if (contents.type !== ProjectFileType) {
      throw Error('Invalid Project');
    }
    return {
      id: contents.id,
      metadata: contents.metadata,
    };
  }

  async listPackagesAsync(): Promise<string[]> {
    return (await fs.readdir(this.projectDirectory, { withFileTypes: true }))
      .filter((entry: Dirent) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry: Dirent) => entry.name);
  }

  private async readYamlFileAsync<T>(relativeFileName: string): Promise<T> {
    const readFileTarget = path.join(this.projectDirectory, relativeFileName);
    const contents = await fs.readFile(readFileTarget, { encoding: 'utf8' });
    return YAML.parse(contents) as T;
  }
}

export default ProjectFile;
