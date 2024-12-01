import type { ProjectCreateError, Result, SmalledProject } from "hoshi-models";
import type FilesDatastore from "../datastore/files";
declare class ProjectsRepository {
    private filesDatastore;
    constructor(filesDatastore: FilesDatastore);
    openProjectAsync(path: string): Promise<SmalledProject | undefined>;
    fetchCurrentProjectAsync(): Promise<SmalledProject | undefined>;
    createProjectAsync(path: string, name: string): Promise<Result<void, ProjectCreateError>>;
}
export default ProjectsRepository;
