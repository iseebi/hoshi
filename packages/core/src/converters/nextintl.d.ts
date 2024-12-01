import { type ExportParameter } from "hoshi-models";
import type { FileSystem } from "../platform";
import type { Converter } from "./type";
export declare const valueEscape: (input: string | undefined) => string;
interface Nesting {
    [key: string]: NestingValue;
}
type NestingValue = string | Nesting;
export declare const makeNesting: (input: Record<string, string>) => Nesting;
declare class NextIntlConverter implements Converter {
    private fileSystem;
    constructor(fileSystem: FileSystem);
    getName(): string;
    exportAsync(param: ExportParameter): Promise<void>;
}
export default NextIntlConverter;
