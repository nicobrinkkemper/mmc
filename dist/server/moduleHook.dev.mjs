import fs from "fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import { ESM_IMPORTS } from "./imports.mjs";
function findSourceThroughSourceMap(url) {
    if (!url)
        return url;
    try {
        const filePath = decodeURIComponent(url.replace("file://", ""));
        // Try to read the external source map first
        const mapPath = `${filePath}.map`;
        if (fs.existsSync(mapPath)) {
            const sourceMap = JSON.parse(fs.readFileSync(mapPath, "utf-8"));
            if (sourceMap.sources?.[0]) {
                const sourcePath = path.resolve(path.dirname(filePath), sourceMap.sourceRoot || "", sourceMap.sources[0]);
                return `file://${sourcePath}`;
            }
        }
        // Fallback to inline source map
        const content = fs.readFileSync(filePath, "utf-8");
        const sourceMapMatch = content.match(/\/\/#\s*sourceMappingURL=data:application\/json;base64,(.+)$/);
        if (sourceMapMatch) {
            const sourceMap = JSON.parse(Buffer.from(sourceMapMatch[1], "base64").toString());
            if (sourceMap.sources?.[0]) {
                const sourcePath = path.resolve(path.dirname(filePath), sourceMap.sourceRoot || "", sourceMap.sources[0]);
                return `file://${sourcePath}`;
            }
        }
    }
    catch (error) {
        return url;
    }
    return url;
}
/**
 * Directly handle all module loading without delegating to React's loader
 */
export async function resolve(specifier, context, nextResolve) {
    // Log for debugging
    console.log("\nResolving:", findSourceThroughSourceMap(context?.parentURL) || "unknown", `(${specifier.split("/").toReversed().slice(-2).join("/")})`);
    // Handle node: protocol
    if (specifier.startsWith("node:")) {
        return nextResolve(specifier, context);
    }
    // Special handling for cookie module
    if (specifier === "cookie") {
        return {
            format: "commonjs",
            shortCircuit: true,
            url: pathToFileURL(ESM_IMPORTS["cookie"]).href,
        };
    }
    // Handle CSS files
    if (specifier.endsWith(".css")) {
        const parentPath = new URL(context.parentURL).pathname;
        const cssPath = path.resolve(path.dirname(parentPath), specifier);
        return {
            format: "module",
            shortCircuit: true,
            url: pathToFileURL(cssPath).href,
        };
    }
    // Handle ESM imports from our mapping
    if (ESM_IMPORTS[specifier]) {
        console.log(`✓ Using mapped import: ${specifier} -> ${ESM_IMPORTS[specifier]}`);
        return {
            shortCircuit: true,
            url: pathToFileURL(ESM_IMPORTS[specifier]).href,
        };
    }
    // Default resolution
    return nextResolve(specifier, context);
}
export async function load(url, context, nextLoad) {
    const urlPath = new URL(url).pathname;
    console.log("\nLoading:", urlPath);
    console.log("Format:", context.format);
    console.log("Import Assertions:", context.importAssertions);
    try {
        // Handle node: protocol and built-in modules first
        if (url.startsWith("node:") ||
            urlPath === "fs" ||
            urlPath === "path" ||
            urlPath === "url") {
            return nextLoad(url);
        }
        // Handle express module
        if (urlPath.includes("node_modules/express/")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const express = require('express');
          export { express as default };
        `,
            };
        }
        // Handle react-dom/server
        if (url.includes("react-dom/server")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
        import { createRequire } from 'node:module';
        const require = createRequire(import.meta.url);
        const { renderToPipeableStream } = require('react-dom/server.node');
        export { renderToPipeableStream };
      `,
            };
        }
        // Handle React module
        if (urlPath.includes("node_modules/react/")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const React = require('react');
          export default React;
          export const createContext = React.createContext;
          export const useState = React.useState;
          export const useContext = React.useContext;
          export const useEffect = React.useEffect;
          export const useRef = React.useRef;
          export const useMemo = React.useMemo;
          export const useCallback = React.useCallback;
          export const useLayoutEffect = React.useLayoutEffect;
          export const useReducer = React.useReducer;
          export const useImperativeHandle = React.useImperativeHandle;
          export const useDebugValue = React.useDebugValue;
          export const useDeferredValue = React.useDeferredValue;
          export const useTransition = React.useTransition;
          export const useId = React.useId;
          export const useSyncExternalStore = React.useSyncExternalStore;
          export const useInsertionEffect = React.useInsertionEffect;
          export const startTransition = React.startTransition;
          export const Children = React.Children;
          export const Component = React.Component;
          export const Fragment = React.Fragment;
          export const Profiler = React.Profiler;
          export const PureComponent = React.PureComponent;
          export const StrictMode = React.StrictMode;
          export const Suspense = React.Suspense;
          export const cloneElement = React.cloneElement;
          export const createElement = React.createElement;
          export const createFactory = React.createFactory;
          export const createRef = React.createRef;
          export const forwardRef = React.forwardRef;
          export const isValidElement = React.isValidElement;
          export const lazy = React.lazy;
          export const memo = React.memo;
          export const use = React.use;
          export const cache = React.cache;
        `,
            };
        }
        // Handle @tanstack/react-router
        if (urlPath.includes("node_modules/@tanstack/react-router/")) {
            // Determine the correct entry point based on the import path
            const source = urlPath.includes("dist/esm")
                ? fs.readFileSync(urlPath, "utf-8")
                : fs.readFileSync(urlPath.replace("/react-router/", "/react-router/dist/esm/"), "utf-8");
            return {
                format: "module",
                shortCircuit: true,
                source,
            };
        }
        // Special handling for cookie module
        if (urlPath.includes("node_modules/cookie/")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import cookieModule from 'node:module';
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const cookie = require('cookie');
          export const { parse, serialize } = cookie;
          export default cookie;
        `,
            };
        }
        // Handle cookie-parser module
        if (urlPath.includes("node_modules/cookie-parser/")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const cookieParser = require('cookie-parser');
          export { cookieParser as default };
        `,
            };
        }
        // Handle set-cookie-parser module
        if (urlPath.includes("set-cookie-parser")) {
            const source = fs.readFileSync(urlPath, "utf-8");
            const cleanSource = source.replace(/module\.exports[^;]+;/g, "");
            return {
                format: "module",
                shortCircuit: true,
                source: `
          ${cleanSource}
          export { parse as default, parse, parseString, splitCookiesString };
        `,
            };
        }
        // Handle CSS modules
        if (url.endsWith(".module.css")) {
            const css = fs.readFileSync(urlPath, "utf-8");
            let json = {};
            await postcss([
                postcssModules({
                    getJSON(_, output) {
                        json = output;
                    },
                }),
            ]).process(css, { from: urlPath });
            return {
                format: "module",
                shortCircuit: true,
                source: `export default ${JSON.stringify(json)};`,
            };
        }
        // Handle JSON files
        if (url.endsWith(".json")) {
            const source = fs.readFileSync(urlPath, "utf-8");
            return {
                format: "json",
                shortCircuit: true,
                source,
            };
        }
        // Handle classnames module
        if (urlPath.includes("node_modules/classnames/")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const classNames = require('classnames');
          export default classNames;
        `,
            };
        }
        // Handle react-server-dom-esm/server.node
        if (urlPath.includes("react-server-dom-esm/server")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const { renderToPipeableStream } = require('react-server-dom-esm/server.node');
          export { renderToPipeableStream };
        `,
            };
        }
        // Handle react-server-dom-esm modules
        if (urlPath.includes("react-server-dom-esm/client.node")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const { createFromNodeStream } = require('react-server-dom-esm/client.node');
          export { createFromNodeStream };
        `,
            };
        }
        // Handle react-dom server modules
        if (urlPath.includes("react-dom/server.node")) {
            return {
                format: "module",
                shortCircuit: true,
                source: `
          import { createRequire } from 'node:module';
          const require = createRequire(import.meta.url);
          const { renderToPipeableStream } = require('react-dom/server');
          export { renderToPipeableStream };
        `,
            };
        }
        // Handle all other modules
        const source = fs.readFileSync(urlPath, "utf-8");
        const debugComment = `\n// DEV - Source: ${url}\n`;
        return {
            format: context.format || "module",
            shortCircuit: true,
            source: debugComment + source,
        };
    }
    catch (error) {
        console.error("Loading error for", url);
        console.error(error);
        return nextLoad(url, context);
    }
}
// We don't need these anymore as we're handling everything in load
export const getSource = undefined;
export const transformSource = undefined;
//# sourceMappingURL=moduleHook.dev.mjs.map