import packageJson from "../package.json" with { type: "json" };

const cleanVersion = (version: string) =>
  version?.replace(/[\^~]/, "") ?? "latest";

// Get the exact React beta version
const reactVersion = cleanVersion(packageJson.devDependencies.react);
const reactDomVersion = cleanVersion(packageJson.devDependencies["react-dom"]);
const clsxVersion = cleanVersion(packageJson.devDependencies.clsx);

console.log("Using React version:", reactVersion);
console.log("Using ReactDOM version:", reactDomVersion);

export const EXTENSIONS = [".js", ".mjs", ".cjs", ".json"];

// Determine if we're in development mode
const isDev = globalThis.process?.env?.["NODE_ENV"] !== "production";
console.log("Environment:", isDev ? "development" : "production");

// ESM imports mapping with environment-aware paths
export const ESM_IMPORTS = {
  react: `https://esm.sh/stable/react@${reactVersion}/es2022/${
    isDev ? "react.development" : "react"
  }.mjs`,
  "react/jsx-runtime": `https://esm.sh/stable/react@${reactVersion}/es2022/${
    isDev ? "jsx-runtime.development" : "jsx-runtime"
  }.mjs`,
  "react-dom": `https://esm.sh/stable/react-dom@${reactDomVersion}/es2022/${
    isDev ? "react-dom.development" : "react-dom"
  }.mjs`,
  "react-dom/client": `https://esm.sh/stable/react-dom@${reactDomVersion}/es2022/${
    isDev ? "client.development" : "client"
  }.mjs`,
  clsx: `https://esm.sh/stable/clsx@${clsxVersion}/es2022/clsx.mjs`,
  "react-server-dom-esm/client": isDev
    ? "./node_modules/react-server-dom-esm/esm/react-server-dom-esm-client.browser.development.js"
    : "./node_modules/react-server-dom-esm/esm/react-server-dom-esm-client.browser.production.js",
  "@jsxImportSource": `https://esm.sh/stable/react@${reactVersion}/es2022/${
    isDev ? "development/" : ""
  }react.mjs`,
};

console.log("ESM_IMPORTS configured:", ESM_IMPORTS);
