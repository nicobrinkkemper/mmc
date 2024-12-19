import path from "node:path";
export const EXTENSIONS = [".js", ".mjs", ".cjs", ".json"];
// Get project root once
export const PROJECT_ROOT = process.cwd();
// ESM imports mapping with absolute paths
export const ESM_IMPORTS = {
    react: path.resolve(PROJECT_ROOT, "node_modules/react/index.js"),
    "react-dom": path.resolve(PROJECT_ROOT, "node_modules/react-dom/index.js"),
    "react-dom/server": path.resolve(PROJECT_ROOT, "node_modules/react-dom/server.browser.js"),
    "react-dom/client": path.resolve(PROJECT_ROOT, "node_modules/react-dom/client.js"),
    "react-server-dom-esm/server": path.resolve(PROJECT_ROOT, "node_modules/react-server-dom-esm/server.node.js"),
    "react-server-dom-esm/client": path.resolve(PROJECT_ROOT, "node_modules/react-server-dom-esm/client.node.js"),
    "react-server-dom-esm/static": path.resolve(PROJECT_ROOT, "node_modules/react-server-dom-esm/static.node.js"),
    "@tanstack/react-router": path.resolve(PROJECT_ROOT, "node_modules/@tanstack/react-router/dist/esm/index.js"),
    classnames: path.resolve(PROJECT_ROOT, "node_modules/classnames/index.js"),
    "lodash-es": path.resolve(PROJECT_ROOT, "node_modules/lodash-es/lodash.js"),
    "@testing-library/react": path.resolve(PROJECT_ROOT, "node_modules/@testing-library/react/dist/index.js"),
    papaparse: path.resolve(PROJECT_ROOT, "node_modules/papaparse/papaparse.js"),
    cookie: path.resolve(PROJECT_ROOT, "node_modules/cookie/index.js"),
    "cookie-parser": path.resolve(PROJECT_ROOT, "node_modules/cookie-parser/index.js"),
    "set-cookie-parser": path.resolve(PROJECT_ROOT, "node_modules/set-cookie-parser/lib/set-cookie.js"),
    express: path.resolve(PROJECT_ROOT, "node_modules/express/index.js"),
    "tiny-warning": path.resolve(PROJECT_ROOT, "node_modules/tiny-warning/dist/tiny-warning.esm.js"),
    "use-sync-external-store/shim/with-selector": path.resolve(PROJECT_ROOT, "node_modules/use-sync-external-store/shim/with-selector.js"),
};
//# sourceMappingURL=imports.mjs.map