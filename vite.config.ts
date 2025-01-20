import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { defineConfig } from "vite";
import { patchCssModules } from "vite-css-modules";
import {
  credits,
  levels,
  notfound,
  themeKeys,
  themes,
} from "./src/config/themeConfig.js";
import { getThemePathInfo } from "./src/data/getThemePathInfo.js";
import { reactStreamPlugin } from "./vite/vite-react-stream/index.js";
import { viteReactClientTransformPlugin } from "./vite/vite-react-stream/transformer/index.js";


export default defineConfig((configEnv) => {
  console.log({ configEnv });
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const createRouter = (fileName: string) => (url: string) => {
    const { route } = getThemePathInfo(url);
    const folder = route === "/"
      ? "page"
      : "page" + route.replace(/:/g, "_");
    
    return resolve(__dirname, "src", folder, fileName);
  };
  const Page = createRouter("page.tsx");
  const props = createRouter("props.ts");

  return {
    root: process.cwd(),
    server: {
      port: 5173,
    },
    plugins: [
      patchCssModules(),
      viteReactClientTransformPlugin(),
      reactStreamPlugin({
        moduleBase: "/src",
        Page,
        props,
        Html: ({ children }) => {
          console.log({ children });
          return React.createElement('div', { key: 'html' }, children);
        },
        pageExportName: "Page",
        propsExportName: "props",
        collectCss: true,
        collectAssets: true,
        build: {
          output: {
            dir: "dist",
            rsc: "rsc",
            ext: ".rsc",
          },
          pages: async () => {
            const themeData = await import("./src/data/generated/themes.js");
            return [
              "/",
              `/${notfound}`,
              ...themes.flatMap((theme, i) => {
                const { batches } = themeData[themeKeys[i]];
                return [
                  `/${theme}`,
                  `/${theme}/${credits}`,
                  `/${theme}/${levels}`,
                  // Level batches
                  ...batches.map(
                    (batch: { batchNumber: string }) => `/${theme}/${levels}/${batch.batchNumber}`
                  ),
                  // Individual levels
                  ...batches.flatMap((batch: { levels: { order: string; batchNumber: string }[] }) =>
                    batch.levels.map(
                      (level: { order: string; batchNumber: string }) =>
                        `/${theme}/${levels}/${level.batchNumber}/${level.order}`
                    )
                  ),
                ];
              }),
            ];
          },
        },
      }),
    ],
    css: {
      modules: {
        generateScopedName: "[name]__[local]",
      },
    },
    build: {
      rollupOptions: {
        input: {
          app: "index.html", // Vite will handle this and find client.tsx, additional css through the module graph
        },
      },
    },
  };
});
