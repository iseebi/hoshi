import { type ExportParameter } from "hoshi-models";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";
declare class AppleStringsConverter implements Converter {
    private fileSystem;
    constructor(fileSystem: FileSystem);
    getName(): string;
    exportAsync(param: ExportParameter): Promise<void>;
}
export default AppleStringsConverter;
