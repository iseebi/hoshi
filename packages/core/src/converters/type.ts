import type { ExportParameter } from "hoshi-models";

export interface Converter {
  getName(): string;
  exportAsync(param: ExportParameter): Promise<void>;
}
