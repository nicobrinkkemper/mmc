import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const buildDir = resolve(dirname, "..", "build");
// Read and parse manifest.json
const manifestPath = resolve(buildDir, "manifest.json");
let manifest: Record<string, any>;

try {
  manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  console.log("Loaded manifest from:", manifestPath);
} catch (err) {
  console.error("Failed to load manifest:", err);
  console.error("Tried path:", manifestPath);
  throw err;
}

/**
 * Recursively collect CSS files from imports
 */
function collectCssFromImports(
  key: string,
  seen = new Set<string>()
): string[] {
  if (seen.has(key)) return [];
  seen.add(key);

  const entry = manifest[key];
  if (!entry) return [];

  const css = entry.css ?? [];
  const importCss = (entry.imports ?? []).flatMap((imp: string) =>
    collectCssFromImports(imp, seen)
  );

  return [...css, ...importCss];
}

/**
 * Recursively collect module imports
 */
function collectImports(key: string, seen = new Set<string>()): string[] {
  if (seen.has(key)) return [];
  seen.add(key);

  const entry = manifest[key];
  if (!entry) return [];

  const imports = entry.imports ?? [];
  const nestedImports = imports.flatMap((imp: string) =>
    collectImports(imp, seen)
  );
  // no accidental duplicates
  const uniqueImports = [...new Set([...imports, ...nestedImports])];

  return uniqueImports;
}

// Find the entry point
const entryPoint = Object.keys(manifest).find(
  (key) => manifest[key].isEntry === true
);

if (!entryPoint) {
  console.warn("No entry point found in manifest");
}

export const htmlAssets = {
  css: entryPoint
    ? collectCssFromImports(entryPoint).map((file) => {
        console.log("file", file);
        return `/${file}`;
      })
    : [],
  main: entryPoint ? `/${manifest[entryPoint].file}` : undefined,
  imports: entryPoint
    ? collectImports(entryPoint).map((imp) => `/${manifest[imp].file}`)
    : [],
} as const;

// For debugging
console.log("HTML Assets:", htmlAssets);
