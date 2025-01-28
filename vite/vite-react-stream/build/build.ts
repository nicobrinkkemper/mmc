import { build as viteBuild } from "vite";
import type { StreamPluginOptions } from "../types.js";
import { createBuildConfig } from "./createBuildConfig.js";

type BuildOptions = {
  root: string;
  base: string;
  outDir: string;
  entries: string[];
  options?: StreamPluginOptions;
};

export async function build(options: BuildOptions) {
  const config = createBuildConfig(options);
  await viteBuild(config);
}
