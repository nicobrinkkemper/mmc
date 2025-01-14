import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export function resolve(
  specifier: string,
  context: any,
  nextResolve: Function
) {
  if (specifier.endsWith(".json")) {
    const parentPath = context.parentURL
      ? fileURLToPath(context.parentURL)
      : process.cwd();
    const resolvedPath = path.resolve(path.dirname(parentPath), specifier);

    return {
      shortCircuit: true,
      url: pathToFileURL(resolvedPath).href,
      format: "module",
    };
  }
  return nextResolve(specifier, context);
}

export function load(url: string, context: any, nextLoad: Function) {
  // Ensure we only handle file URLs
  if (!url.startsWith("file:")) {
    return nextLoad(url, context);
  }

  if (url.endsWith(".json")) {
    const source = readFileSync(fileURLToPath(url), "utf-8");
    return {
      format: "module",
      source: `export default ${source};`,
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
