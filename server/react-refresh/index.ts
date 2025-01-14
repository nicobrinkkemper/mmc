import type { JscTarget, ParserConfig } from "@swc/core";
import { RefreshRuntime } from "./runtime.js";

export interface RefreshOptions {
  jsxImportSource?: string;
  tsDecorators?: boolean;
  plugins?: [string, Record<string, any>][];
  devTarget?: JscTarget;
  parserConfig?: (id: string) => ParserConfig | undefined;
}

export function createRefreshRuntime(options: RefreshOptions) {
  // Implementation
}

export { RefreshRuntime };
