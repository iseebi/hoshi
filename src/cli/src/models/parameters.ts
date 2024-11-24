export type CommandContext = {
  project: string | undefined;
  package: string | undefined;
};

export type GlobalOptions = {
  project: string | undefined;
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

export type CreatePackageParameter = {
  name: string;
  options: GlobalOptions;
  context: CommandContext;
};

export type CreateVersionParameter = {
  name: string;
  options: GlobalOptions & {
    package: string;
  };
  context: CommandContext;
};
