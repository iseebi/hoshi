declare class ProjectFileError extends Error {
    fileName?: string;
    positions: {
        line: number;
        column: number;
    }[];
    constructor(message: string, fileName?: string, positions?: {
        line: number;
        column: number;
    }[]);
}
export default ProjectFileError;
