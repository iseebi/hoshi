import type { EditableVersion } from "hoshi-models";
import type { ConverterDatastore } from "../datastore";

class PublishRepository {
  private converterDatastore: ConverterDatastore;

  public constructor(converterDatastore: ConverterDatastore) {
    this.converterDatastore = converterDatastore;
  }

  availableFormatsAsync(): Promise<string[]> {
    return this.converterDatastore.availableExportFormatsAsync();
  }

  async publishAsync(
    format: string,
    data: EditableVersion,
    packageMetadata: Record<string, string>,
    projectMetadata: Record<string, string>,
    context: Record<string, string>,
    outDir: string,
  ): Promise<boolean> {
    try {
      await this.converterDatastore.exportAsync({
        format,
        outDir,
        metadata: {
          project: projectMetadata,
          package: packageMetadata,
          version: data.metadata,
          context,
        },
        languages: data.languages,
        keys: data.keys,
        phrases: data.historyPhrases,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default PublishRepository;
