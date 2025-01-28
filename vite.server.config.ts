import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
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
import { Html } from "./src/Html.server.js";
import { reactStreamPlugin } from "./vite/vite-react-stream/plugin.js";
import { viteReactClientTransformPlugin } from "./vite/vite-react-stream/transformer/index.js";
import { preserveDirectives } from "./vite/vite-react-stream/transformer/preserveDirectives.js";

const themePages = async () => {
  const themeData = await import("./src/data/generated/themes.js");
  const batches = themes.flatMap((theme: string, i: number) => {
    const { batches } = themeData[themeKeys[i]];
    return batches.flatMap(
      (batch: { batchNumber: number; levels: { order: string }[] }) => [
        `/${theme}`,
        `/${theme}/${credits}`,
        `/${theme}/${levels}`,
        `/${theme}/${levels}/${batch.batchNumber}`,
        ...batch.levels.map(
          (level) => `/${theme}/${levels}/${batch.batchNumber}/${level.order}`
        ),
      ]
    );
  });
  return batches;
};

const pageEntries = async () => {
  return ["/", `/${notfound}`, ...(await themePages())];
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const createRouter = (fileName: string) => (url: string) => {
  const { route } = getThemePathInfo(url);
  const folder = route === "/" ? "page" : `page${route.replace(/:/g, "_")}`;
  return resolve(__dirname, "src", folder, fileName);
};

export default defineConfig((_configEnv) => {
  return {
    root: process.cwd(),
    server: {
      port: 5173,
    },
    build: {
      target: ["es2022", "node20"],
      ssr: true,
      outDir: "dist/server",
      rollupOptions: {
        input: "src/server.tsx",
        output: {
          format: "esm",
          preserveModules: true,
        },
      },
    },
    plugins: [
      patchCssModules(),
      viteReactClientTransformPlugin(),
      reactStreamPlugin({
        moduleBase: "/src",
        Page: createRouter("page.tsx"),
        props: createRouter("props.ts"),
        Html: Html,
        pageExportName: "Page",
        propsExportName: "props",
        collectCss: true,
        collectAssets: true,
        build: {
          pages: pageEntries,
          client: "dist/client",
        },
      }),
      preserveDirectives(),
    ],
  };
});
