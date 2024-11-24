export type CommandContext = {
  project: string | undefined;
  package: string | undefined;
};

export type GlobalOptions = {
  project: string;
};

export type PublishParameter = {
  packages: string[];
  context: CommandContext;
  options: GlobalOptions & {
    outDir: string;
    version?: string;
    format?: string;
  };
};

export type CreateProjectParameter = {
  name: string;
  options: GlobalOptions;
};

export type CreateParameter = {
  name: string;
  context: CommandContext;
  options: GlobalOptions;
};
