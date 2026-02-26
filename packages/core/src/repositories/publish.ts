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
      const languages = (() => {
        const metadataLanguages = (): string[] => {
          if (packageMetadata.availableTranslations) {
            return Array.isArray(packageMetadata.availableTranslations) ? packageMetadata.availableTranslations : packageMetadata.availableTranslations.split(",")
          }
          if (projectMetadata.availableTranslations) {
            return Array.isArray(projectMetadata.availableTranslations) ? projectMetadata.availableTranslations : projectMetadata.availableTranslations.split(",")
          }
          return [];
        };
        const dataLanguages = data.languages;
        return Array.from(new Set<string>([...metadataLanguages(), ...dataLanguages]));
      })();
      await this.converterDatastore.exportAsync({
        format,
        outDir,
        metadata: {
          project: projectMetadata,
          package: packageMetadata,
          version: data.metadata,
          context,
        },
        languages,
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
