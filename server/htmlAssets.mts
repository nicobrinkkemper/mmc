import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { build } from "./constants.js";

// Read and parse manifest.json
const manifestPath = resolve(build, "manifest.json");
let manifest: Record<string, any>;

try {
  manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
} catch (err) {
  console.warn("No manifest found, using empty object");
  manifest = {};
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

  return [...imports, ...nestedImports];
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
    ? collectCssFromImports(entryPoint).map((file) => `/${file}`)
    : [],
  main: entryPoint ? `/${manifest[entryPoint].file}` : undefined,
  imports: entryPoint
    ? collectImports(entryPoint).map((imp) => `/${manifest[imp].file}`)
    : [],
} as const;

// For debugging
console.log("HTML Assets:", htmlAssets);
