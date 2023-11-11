import { ExportParameter } from '../../../models/converter';
import { Converter } from '../converters';

class ConverterDatastore {
  private readonly converters: Record<string, Converter>;

  public constructor(converters: Converter[]) {
    this.converters = converters.reduce(
      (prev, cur) => ({ ...prev, [cur.getName()]: cur }),
      {} as Record<string, Converter>,
    );
  }

  availableExportFormatsAsync(): Promise<string[]> {
    return Promise.resolve(Object.keys(this.converters));
  }

  async exportAsync(param: ExportParameter): Promise<boolean> {
    const converter = this.converters[param.format];
    if (!converter) {
      return false;
    }
    try {
      await converter.exportAsync(param);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default ConverterDatastore;
