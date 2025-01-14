import path from "path";
import { defineConfig } from "vite";
import { patchCssModules } from "vite-css-modules";
import { getThemePathInfo } from "./src/data/getThemePathInfo.js";
import { rscTransformPlugin } from "./vite/rsc-transform";
import { viteReactStream } from "./vite/vite-react-stream/index.js";

const ReactCompilerConfig = {
  sources: (filePath: string) => {
    return filePath.indexOf(".client") === -1;
  },
};

const createRouter = (fileName: string) => (url: string) => {
  const { route } = getThemePathInfo(url);
  const fixRoot = route === "/" ? "" : route.replace(/:/g, "_");
  return `src/page${fixRoot}/${fileName}`;
};
console.log(path.resolve(__dirname, "src"));
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
    rscTransformPlugin({
      projectRoot: __dirname,
      moduleBase: "/src",
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
        app: "index.html", // Vite will handle this and find ssr.tsx, additional css through the module graph
      },
    },
  },
}));
// ps if you save this file or any of the files imported directly here, you need to restart. Won't fix for now.
