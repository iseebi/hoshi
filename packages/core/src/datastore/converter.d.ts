import type { ExportParameter } from "hoshi-models";
import type { Converter } from "../converters";
declare class ConverterDatastore {
    private readonly converters;
    constructor(converters: Converter[]);
    availableExportFormatsAsync(): Promise<string[]>;
    exportAsync(param: ExportParameter): Promise<boolean>;
}
export default ConverterDatastore;
