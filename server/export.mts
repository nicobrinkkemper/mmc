
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { credits, levels, notfound, themes } from "../src/config/themeConfig.js";
import * as themeData from "../src/data/generated/themes.js" with { type: "json" };

const routes = [
  { path: "/" },
  { path: `/${notfound}` },
  ...themes.flatMap((theme) => {
    const data = themeData[`_${theme}`];
    
    return [
      { path: `/${theme}` },
      { path: `/${theme}/${credits}` },
      { path: `/${theme}/${levels}` },
      // Level batches
      ...data.batches.map((batch) => ({
        path: `/${theme}/${levels}/${batch.batchNumber}`,
      })),
      // Individual levels
      ...data.batches.flatMap((batch) =>
        batch.levels.map((level) => ({
          path: `/${theme}/${levels}/${level.batchNumber}/${level.order}`,
        }))
      ),
    ];
  }),
];

async function generateStaticFiles() {
  const BASE_DIR = resolve(process.cwd(), "build");

  // Ensure base directory exists
  mkdirSync(BASE_DIR, { recursive: true });

  for (const route of routes) {
    try {
      // Normalize path and create output path
      const normalizedPath = route.path.replace(/^\/+/, "").replace(/\/+$/, "");
      const outputPath = resolve(
        BASE_DIR,
        normalizedPath ? `${normalizedPath}/index.html` : "index.html"
      );

      // Ensure directory exists
      mkdirSync(dirname(outputPath), { recursive: true });

      const response = await fetch(`http://localhost:3001/${normalizedPath}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();

      writeFileSync(outputPath, html);
      console.log(`[SSR] Generated ${route.path} -> ${outputPath}`);
    } catch (error) {
      console.error(`[SSR] Failed to generate ${route.path}:`, error);
    }
  }

  console.log("🚀 Static build ready!");
}

generateStaticFiles().catch(console.error);
