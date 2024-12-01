import { type ExportParameter } from "hoshi-models";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";
export declare const valueEscape: (input: string | undefined) => string;
declare class JsonConverter implements Converter {
    private fileSystem;
    constructor(fileSystem: FileSystem);
    getName(): string;
    exportAsync(param: ExportParameter): Promise<void>;
}
export default JsonConverter;
