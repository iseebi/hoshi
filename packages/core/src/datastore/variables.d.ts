import type { Platform } from "../platform";
declare class VariablesDatastore {
    private platform;
    constructor(platform: Platform);
    getVariables(): Record<string, string>;
    getGitVariablesAsync(baseDir: string): Promise<Record<string, string>>;
    private readGitHeadAsync;
    private readGitDateAsync;
}
export default VariablesDatastore;
