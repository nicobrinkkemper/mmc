import manifest from "../build/manifest.json" with { type: "json" };
const entry = manifest["index.html"];
// Get imports and CSS from entry
const htmlAssets = {
    main: "/" + entry.file,
    imports: entry.imports.map(imp => "/" + manifest[imp].file),
    css: entry.css.map(css => "/" + css)
};
export { htmlAssets };
//# sourceMappingURL=htmlAssets.mjs.map