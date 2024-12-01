import type { EditableVersion } from "hoshi-models";
import type { ConverterDatastore } from "../datastore";
declare class PublishRepository {
    private converterDatastore;
    constructor(converterDatastore: ConverterDatastore);
    availableFormatsAsync(): Promise<string[]>;
    publishAsync(format: string, data: EditableVersion, packageMetadata: Record<string, string>, projectMetadata: Record<string, string>, context: Record<string, string>, outDir: string): Promise<boolean>;
}
export default PublishRepository;
