import { StreamPluginOptions } from "vite-plugin-react-server";
import { fileRouter } from "vite-plugin-react-server/router";
import { metricWatcher } from "vite-plugin-react-server/metrics";
import { levels, themeKeys, themes } from "./src/config/themeConfig.js";

// Data-driven prerender paths for the dynamic ($param) routes. Static routes
// (/, /404) are discovered from the file tree automatically, so only the
// concrete theme/level urls need enumerating here.
const themeLevelBatchPaths = async (): Promise<string[]> => {
  const themeData = await import("./src/data/generated/themes.js");
  return themes.flatMap((theme: string, i: number) =>
    themeData[themeKeys[i]].batches.map(
      (batch: { batchNumber: number }) =>
        `/${theme}/${levels}/${batch.batchNumber}`
    )
  );
};

const themeLevelOrderPaths = async (): Promise<string[]> => {
  const themeData = await import("./src/data/generated/themes.js");
  return themes.flatMap((theme: string, i: number) =>
    themeData[themeKeys[i]].batches.flatMap(
      (batch: { batchNumber: number; levels: { order: string }[] }) =>
        batch.levels.map(
          (level) => `/${theme}/${levels}/${batch.batchNumber}/${level.order}`
        )
    )
  );
};

// File-based routing lives in the engine now. fileRouter scans src/page/** for
// page.tsx (+ sibling props.ts) and produces Page/props/build.pages, replacing
// the hand-rolled createRouter(url)=>path switch and the manual `pages` list.
// Only the data-driven concrete paths for the $param routes stay here.
const router = fileRouter("src/page", {
  staticPaths: {
    "/$theme": () => themes.map((theme: string) => ({ theme })),
    "/$theme/credits": () => themes.map((theme: string) => ({ theme })),
    "/$theme/levels": () => themes.map((theme: string) => ({ theme })),
    "/$theme/levels/$batchNumber": themeLevelBatchPaths,
    "/$theme/levels/$batchNumber/$order": themeLevelOrderPaths,
  },
});

// process.env.GITHUB_ACTIONS = "true";
export const config = {
  moduleBase: "src",
  publicOrigin: process.env.PUBLIC_ORIGIN || process.env.VITE_PUBLIC_ORIGIN || "",
  moduleBasePath: "/",
  moduleBaseURL: process.env.BASE_URL || process.env.VITE_BASE_URL || "/",
  verbose: false,
  rscTimeout: 30000, // 30 seconds for large projects
  htmlTimeout: 60000, // 60 seconds for large projects
  fileWriteTimeout: 30000, // 30 seconds for large projects
  Page: router.Page,
  props: router.props,
  routePatterns: router.routePatterns,
  Root: "src/MmcRoot.tsx",
  Html: "src/MmcHtml.tsx",
  pageExportName: "Page",
  propsExportName: "props",
  htmlExportName: "Html",
  rootExportName: "Root",
  onMetrics: metricWatcher({
    warnOnly: false,
    warn: (...args) => console.warn(...args),
    info: (...args) => console.info(...args),
  }),
  serverEntry: "src/server.tsx",
  css: {
    inlineThreshold: 1000,
  },
  build: {
    pages: router.build.pages,
    // Flash-free first render: vprs inlines each route's flight payload into its
    // index.html at the post-SSG point, in both build modes (>= 2.6.0).
    inlineFlight: true,
  },
} satisfies StreamPluginOptions;
