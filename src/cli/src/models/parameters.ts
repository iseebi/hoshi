export type GlobalOptions = {
  project: string;
};

export type PublishParameter = {
  packages: string[];
  options: GlobalOptions & {
    outDir: string;
    version?: string;
    format?: string;
  };
};
