import type VariablesDatastore from "../datastore/variables";

class ContextRepository {
  private variablesDatastore: VariablesDatastore;

  public constructor(variablesDatastore: VariablesDatastore) {
    this.variablesDatastore = variablesDatastore;
  }

  public async fetchContextAsync(projectPath: string): Promise<Record<string, string>> {
    const gitVariables = await this.variablesDatastore.getGitVariablesAsync(projectPath);
    const envVariables = this.variablesDatastore.getVariables();
    return {
      ...gitVariables,
      ...envVariables,
    };
  }
}

export default ContextRepository;
