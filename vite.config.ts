import { defineConfig } from "vite";
import { patchCssModules } from "vite-css-modules";
import { getThemePathInfo } from "./src/data/getThemePathInfo.js";
import { viteReactClientTransformPlugin } from "./vite/vite-react-client-transform/index.js";
import { viteReactStream } from "./vite/vite-react-stream/index.js";


const createRouter = (fileName: string) => (url: string) => {
  const { route } = getThemePathInfo(url);
  const { pathname } = new URL(`file://./src/page${route.replace(/:/g, "_")}/${fileName}`)
  return pathname;
};

export default defineConfig(() => ({
  server: {
    port: 5173,
    warmup: {
      clientFiles: [
        "./src/page/*/page.tsx",
        "./src/page/*/props.ts",
        "./src/**/*.module.css",
      ],
    },
  },
  plugins: [
    patchCssModules(),
    viteReactClientTransformPlugin({
      projectRoot: __dirname
    }),
    viteReactStream({
      moduleBase: "/src",
      Page: createRouter("page.tsx"),
      props: createRouter("props.ts"),
      pageExportName: "Page",
      propsExportName: "props",
      build: {
        pages: "src/page/pages.tsx",
        output: {
          dir: "dist",
          rsc: "rsc",
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
}));
// ps if you save this file or any of the files imported directly here, you need to restart. Won't fix for now.
