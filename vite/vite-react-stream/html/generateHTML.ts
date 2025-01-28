import fs from "node:fs/promises";
import path from "node:path";
import { DEFAULT_CONFIG } from "../options.js";

type GenerateHTMLOptions = {
  outDir?: string;
  route: string;
  html: string;
};

export async function generateHTML({
  route,
  html,
  outDir = DEFAULT_CONFIG.SERVER_OUT_DIR,
}: GenerateHTMLOptions) {
  const outputPath = getOutputPath(route, outDir);
  console.log("[HTML] Generating:", { route, outputPath });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html);
}

function getOutputPath(route: string, outDir: string) {
  const basePath = route === "/" ? "/index" : `${route}/index`;
  return path.join(outDir, basePath + ".html");
}
