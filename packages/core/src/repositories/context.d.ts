import type VariablesDatastore from "../datastore/variables";
declare class ContextRepository {
    private variablesDatastore;
    constructor(variablesDatastore: VariablesDatastore);
    fetchContextAsync(projectPath: string): Promise<Record<string, string>>;
}
export default ContextRepository;
