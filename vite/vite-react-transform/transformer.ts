export interface TransformerOptions {
  moduleId: (path: string) => string;
}

export function createRscTransformer(options: TransformerOptions) {
  return {
    name: "vite:react-transform",
    enforce: "post" as const,

    async transform(code: string, path: string) {
      if (!code || !path.endsWith(".tsx")) return null;

      const directiveMatch = code.match(/(?:^|\n|;)"use client";?/);
      if (!directiveMatch) return null;

      const moduleId = options.moduleId(path);

      const exportMatch = code.match(
        /export\s+(?:const|let|var|function|class)\s+(\w+)/
      );
      if (!exportMatch) return null;

      const [fullMatch, exportName] = exportMatch;
      const isClass = fullMatch.includes("class");
      const modifiedCode = code.replace(
        fullMatch,
        fullMatch.replace("export ", "")
      );

      return {
        code: `${modifiedCode}
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
        map: null,
      };
    },
  };
}
