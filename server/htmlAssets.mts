// @ts-ignore
import manifest from "../build/manifest.json" with { type: "json" };
const entry = manifest["index.html"];

// Get imports and CSS from entry
const htmlAssets: HtmlAssets = {
  main: "/" + entry.file,
  imports: entry.imports.map((imp: any) => "/" + (manifest as any)[imp].file),
  css: entry.css.map((  css: any) => "/" + css),
};

export { htmlAssets };
