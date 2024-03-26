class ProjectFileError extends Error {
  public fileName?: string;

  public positions: { line: number; column: number }[];

  public constructor(message: string, fileName?: string, positions: { line: number; column: number }[] = []) {
    super(message);
    this.fileName = fileName;
    this.positions = positions;
  }
}

export default ProjectFileError;
