import { Phrase } from './project';

export type ExportParameter = {
  format: string;
  outDir: string;
  metadata: {
    project: Record<string, string>;
    package: Record<string, string>;
    version: Record<string, string>;
  };
  languages: string[];
  keys: string[];
  phrases: Record<string, Phrase>;
};
