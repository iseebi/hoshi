import { type Result } from "hoshi-models";
import type { CommandContext } from "./models";
declare const detectContext: () => Promise<Result<CommandContext, Error>>;
export default detectContext;
