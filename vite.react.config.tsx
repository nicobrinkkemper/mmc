import { StreamPluginOptions } from "vite-plugin-react-server";
import { metricWatcher } from "vite-plugin-react-server/metrics";
import { levels, themeKeys, themes } from "./src/config/themeConfig.js";

// Data-driven prerender paths for the dynamic ($param) routes. Static routes
// (/, /404) are discovered from the file tree automatically, so only the
// concrete theme/level urls need enumerating here.
const themeLevelBatchPaths = async (): Promise<string[]> => {
  const themeData = await import("./src/data/generated/themes.js");
  return themes.flatMap((theme: string, i: number) =>
    themeData[themeKeys[i] as keyof typeof themeData].batches.map(
      (batch) =>
        `/${theme}/${levels}/${batch.batchNumber}`
    )
  );
};

const themeLevelOrderPaths = async (): Promise<string[]> => {
  const themeData = await import("./src/data/generated/themes.js");
  return themes.flatMap((theme: string, i: number) =>
    themeData[themeKeys[i] as keyof typeof themeData].batches.flatMap(
      (batch) =>
        batch.levels.map(
          (level) => `/${theme}/${levels}/${batch.batchNumber}/${level.order}`
        )
    )
  );
};

const themeOrder = (): Record<string, string>[] => themes.map((theme: string) => ({ theme: theme }));

// File-based routing in one field: `routes: { dir }` (relative to moduleBase)
// scans src/app/** for page.tsx (+ sibling props.ts) and derives Page / props /
// routePatterns / the prerender worklist — no more restating them. Static routes
// (/, /404) are discovered from the tree; only the data-driven concrete paths
// for the $param routes need enumerating here.
// process.env.GITHUB_ACTIONS = "true";
export const config = {
  moduleBase: "src",
  publicOrigin: process.env.PUBLIC_ORIGIN || process.env.VITE_PUBLIC_ORIGIN || "",
  moduleBasePath: "/",
  moduleBaseURL: process.env.BASE_URL || process.env.VITE_BASE_URL || "/",
  verbose: false,
  routes: {
    dir: "app",
    staticPaths: {
      "/$theme": themeOrder,
      "/$theme/credits": themeOrder,
      "/$theme/levels": themeOrder,
      "/$theme/levels/$batchNumber": themeLevelBatchPaths,
      "/$theme/levels/$batchNumber/$order": themeLevelOrderPaths,
    },
  },
  Root: "src/MmcRoot.tsx",
  Html: "src/MmcHtml.tsx",
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
    // Flash-free first render: vprs inlines each route's flight payload into its
    // index.html at the post-SSG point, in both build modes (>= 2.6.0).
    inlineFlight: true,
  },
} satisfies StreamPluginOptions;
