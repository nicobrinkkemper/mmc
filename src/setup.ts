// write vitest setup
import type { GlobalSetupContext } from "vitest/node";

export default function setup({ provide }: GlobalSetupContext) {
  provide("wsPort", 3000);
}

declare module "vitest" {
  export interface ProvidedContext {
    wsPort: number;
  }
}
