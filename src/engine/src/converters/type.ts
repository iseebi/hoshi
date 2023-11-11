import { ExportParameter } from '../../../models/converter';

export interface Converter {
  getName(): string;
  exportAsync(param: ExportParameter): Promise<void>;
}
