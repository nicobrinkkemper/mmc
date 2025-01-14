// Default values for the transformer
const _lineBreakStyle = "\n";
const _quote = '"';
const _end = ";";
const _exportMatchRegex = new RegExp(/export\s+(const|function|class)\s+(\w+)/);
const _includeRegex = new RegExp(/\.m?[jt]sx?$/);
const _directiveRegex = new RegExp(
  `${_quote}use (client|server)${_quote}${_end}`
);

/**
 * Default module ID transformer - just returns the path as-is
 */
const _toId = (path: string) => path;

export interface RscPluginOptions {
  /** Regex to match files that should be transformed */
  includeRegex?: RegExp;
  /** Regex to match use client/server directives */
  directiveRegex?: RegExp;
  /** Regex to match export statements */
  exportMatchRegex?: RegExp;
  /** Function to transform file paths into module IDs */
  toId?: (path: string) => string;
}

/**
 * Creates an RSC transformer with the given options
 */
export const createRscTransformer =
  ({
    includeRegex = _includeRegex,
    directiveRegex = _directiveRegex,
    exportMatchRegex = _exportMatchRegex,
    toId = _toId,
  }: RscPluginOptions = {}) =>
  async (code: string, path: string) => {
    if (!code || code === "") return;
    if (!path.match(includeRegex)) return;

    // Skip if already transformed
    if (
      code.includes("registerClientReference") ||
      code.includes("registerServerReference")
    )
      return;

    const fullDirective = code.match(directiveRegex);
    if (!fullDirective || !fullDirective[1]) return;
    const directiveString = fullDirective[0];
    const directive = fullDirective[1];
    if (!code.startsWith(directiveString)) return;

    const restCode = code.slice(directiveString.length + 1);

    const registerFunction =
      directive === "client"
        ? "registerClientReference"
        : "registerServerReference";

    const importLine = `import { ${registerFunction} } from ${_quote}react-server-dom-esm/server.node${_quote}${_end}`;

    const exportMatch = code.match(exportMatchRegex);
    if (!exportMatch) return;
    const exportName = exportMatch[2];

    // Let the consumer decide how to transform the path
    const moduleId = toId(path);

    const exportLine = `export default ${registerFunction}(${exportName}, ${_quote}${moduleId}${_quote}, ${_quote}${exportName}${_quote})${_end}`;

    return {
      code: [directiveString, importLine, restCode, exportLine].join(
        _lineBreakStyle
      ),
      map: null,
    };
  };

/**
 * Creates a Vite plugin for transforming RSC modules
 */
export const rscTransformPlugin = (
  options: RscPluginOptions = {},
  name = "vite:react-transform"
) => ({
  name,
  transform: createRscTransformer(options),
});
