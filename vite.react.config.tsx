import { StreamPluginOptions } from "vite-plugin-react-server";
import { metricWatcher } from "vite-plugin-react-server/metrics";
import { levels, themeKeys, themes } from "./src/config/themeConfig.js";

type ThemeData = typeof import("./src/data/generated/themes.js");

// Every theme now lives in its own static `app/<theme>/` route folder, so the
// static /<theme> /credits /levels routes are auto-discovered from the file
// tree. Only the two dynamic level routes per theme (`levels/$batchNumber` and
// its `/$order`) need concrete prerender paths enumerated here.
const batchPaths = (data: ThemeData, theme: string, i: number): string[] =>
  data[themeKeys[i] as keyof ThemeData].batches.map(
    (batch) => `/${theme}/${levels}/${batch.batchNumber}`
  );

const orderPaths = (data: ThemeData, theme: string, i: number): string[] =>
  data[themeKeys[i] as keyof ThemeData].batches.flatMap((batch) =>
    batch.levels.map(
      (level) => `/${theme}/${levels}/${batch.batchNumber}/${level.order}`
    )
  );

const themeBatchPaths = (theme: string) => async (): Promise<string[]> => {
  const data = await import("./src/data/generated/themes.js");
  return batchPaths(data, theme, themes.indexOf(theme as never));
};

const themeOrderPaths = (theme: string) => async (): Promise<string[]> => {
  const data = await import("./src/data/generated/themes.js");
  return orderPaths(data, theme, themes.indexOf(theme as never));
};

// One generator pair per theme, keyed by that theme's dynamic level routes.
const staticPaths = Object.fromEntries(
  themes.flatMap((theme: string) => [
    [`/${theme}/${levels}/$batchNumber`, themeBatchPaths(theme)],
    [`/${theme}/${levels}/$batchNumber/$order`, themeOrderPaths(theme)],
  ])
);

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
    staticPaths,
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
