/**
 * React ESM Module Hook
 *
 * Handles React Server Components and "use client"/"use server" directives
 * See: react-server-dom-esm/node-loader
 *
 * Note: Instead of using registerClientReference, we could manually define the properties:
 * ```typescript
 * Object.defineProperties(implementation, {
 *   $$typeof: { value: Symbol.for("react.client.reference") },
 *   $$id: { value: `${moduleId}#${exportName}` },
 *   $$async: { value: true }  // Always true for client components
 * });
 * ```
 *
 * And for server functions:
 * ```typescript
 * Object.defineProperties(implementation, {
 *   $$typeof: { value: Symbol.for("react.server.reference") },
 *   $$id: { value: `${moduleId}#${exportName}`, configurable: true },
 *   $$bound: { value: null, configurable: true },
 *   $$location: { value: Error("react-stack-top-frame"), configurable: true },
 *   bind: { value: bind, configurable: true }
 * });
 * ```
 * However since I do NOT know what these things do, I'm just using registerClientReference that is
 * exported from react-server-dom-esm/server.node (undocumented, only available in react github repo oss-experimental build directory)
 */

import { readFileSync } from "fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRscTransformer } from "./rscTransformPlugin.js";
// Similar to vite.config.ts

const dir = dirname(fileURLToPath(import.meta.url));
let projectRoot = pathResolve(dir, "..");
let distRoot = projectRoot.includes("dist")
  ? projectRoot
  : pathResolve(projectRoot, "dist");
if (projectRoot.includes("dist")) {
  projectRoot = projectRoot.replace("dist", "");
}
if (projectRoot.startsWith("/")) projectRoot = projectRoot.slice(1);
if (distRoot.startsWith("/")) distRoot = distRoot.slice(1);

console.log("distRoot", distRoot);
console.log("projectRoot", projectRoot);
const removeStart = (path: string, start: string) => {
  if (path.startsWith(start)) {
    // ensure the base is removed
    return path.slice(start.length);
  }
  if (path.startsWith("/" + start)) {
    // ensure the base is removed
    return path.slice(start.length + 1);
  }
  return path;
};

const removeSourceExtension = (path: string) => {
  return path.replace(/\.m?[jt]sx?$/, "");
};

const getSourceExtension = (path: string) => {
  if (projectRoot === distRoot) {
    const ext = path.split(".").pop() ?? "";
    if (["ts", "tsx", "mts"].includes(ext)) return `.${ext}`;
    return ".js";
  }
  if (path.includes(".")) {
    const extension = path.split(".").pop();
    if (extension?.startsWith("m")) return ".mjs";
  }
  return ".js";
};

export const getRelativePath = (path: string) => {
  console.log("distRoot", distRoot);
  console.log("path", path.replace(distRoot, ""));
  return path.replace(distRoot, "");
};

export const getSourceBase = (relativePath: string) => {
  if (relativePath.includes("/")) {
    // return first segment
    const base = relativePath.split("/")[0] + "/";
    if (typeof base === "string") return base;
  }
  return "";
};

export const fileToModuleID = (path: string) => {
  const moduleId = removeSourceExtension(removeStart(path, projectRoot));

  return moduleId + getSourceExtension(path);
};

export const fileToModulePath = (file: string) => {
  return fileToModuleID(file);
};

const transformer = createRscTransformer({
  toId: (path) => fileToModuleID(path),
});

export function load(url: string, context: any, nextLoad: Function) {
  if (!url.startsWith("file:")) return nextLoad(url, context);

  const filePath = fileURLToPath(url);
  if (!filePath.match(/\.m?[jt]sx?$/)) {
    return nextLoad(url, context);
  }

  const source = readFileSync(filePath, "utf-8");
  if (!source.includes('"use client"') && !source.includes('"use server"')) {
    return nextLoad(url, context);
  }

  try {
    const transformed = transformer(source, filePath);
    return {
      format: "module",
      source: transformed,
      shortCircuit: true,
    };
  } catch (error) {
    console.error("Error transforming module:", error);
    return nextLoad(url, context);
  }
}

export function resolve(
  specifier: string,
  context: any,
  nextResolve: Function
) {
  return nextResolve(specifier, {
    ...context,
    conditions: [...(context.conditions || []), "react-server"],
  });
}
