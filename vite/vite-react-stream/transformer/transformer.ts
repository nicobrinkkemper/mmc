import type { TransformerOptions } from "./types.js";

// m[jt]sx?
const fileRegex = /\.m?[jt]sx?$/;

export function createRscTransformer(options: TransformerOptions) {
  return {
    name: "vite:react-stream-transformer",
    enforce: "post" as const,

    async transform(code: string, path: string, { inMap, ssr }: { inMap: null | string, ssr: boolean }) {
      if (!code || !code.trimStart().match(/^["']use client["']/)) {
        return null;
      }

      // Keep src path for dev
      const moduleId = options.moduleId(path, ssr);

      const exportMatch = code.match(
        /export\s+(?:const|let|var|function|class)\s+(\w+)/
      );
      if (!exportMatch) return null;

      const [fullMatch, exportName] = exportMatch;
      if (!exportName) return null;

      const isClass = fullMatch.includes("class");
      // if(ssr) code = code.trimStart().slice(fullMatch.length);
      const modifiedCode = code.replace(
        fullMatch,
        fullMatch.replace("export ", "")
      );
      return {
        code: `${modifiedCode.trimStart()}
const ${exportName}Ref = Object.defineProperties(
  ${isClass
    ? `class extends ${exportName} {
        constructor(...args) { super(...args); }
      }`
    : `function(...args) { return ${exportName}.apply(null, args); }`
  },
  {
    $$typeof: { value: Symbol.for("react.client.reference") },
    $$id: { value: ${JSON.stringify(moduleId + "#" + exportName)} }
  }
);
export { ${exportName}Ref as ${exportName} };`,
      };
    },
  };
}
