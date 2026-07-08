import { StreamPluginOptions } from "vite-plugin-react-server";
import { metricWatcher } from "vite-plugin-react-server/metrics";
import { levels, themeKeys, themes } from "./src/config/themeConfig.js";

type ThemeData = typeof import("./src/data/generated/themes.js");

// Themes that have graduated to their own static `app/<theme>/` route folder.
// Their concrete level paths are enumerated per-folder (below), so the dynamic
// `$theme` generators skip them — each concrete url is prerendered exactly once
// and static routes out-rank the `$theme` fallback at match time.
const migratedThemes: readonly string[] = ["4ymm"];
const isMigrated = (theme: string) => migratedThemes.includes(theme);

// Per-theme concrete paths for the `levels/$batchNumber(/$order)` routes, shared
// by the dynamic `$theme` fallback and each migrated theme's static folder.
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

// Data-driven prerender paths for the dynamic ($param) routes. Static routes
// (/, /404, and each migrated theme's /home /credits /levels) are discovered
// from the file tree automatically, so only the concrete theme/level urls for
// still-dynamic routes need enumerating here.
const themeLevelBatchPaths = async (): Promise<string[]> => {
  const data = await import("./src/data/generated/themes.js");
  return themes.flatMap((theme: string, i: number) =>
    isMigrated(theme) ? [] : batchPaths(data, theme, i)
  );
};

const themeLevelOrderPaths = async (): Promise<string[]> => {
  const data = await import("./src/data/generated/themes.js");
  return themes.flatMap((theme: string, i: number) =>
    isMigrated(theme) ? [] : orderPaths(data, theme, i)
  );
};

// Per-migrated-theme generators: the `$batchNumber(/$order)` segments stay
// dynamic inside a theme folder, so enumerate that one theme's concrete paths.
const migratedBatchPaths = (theme: string) => async (): Promise<string[]> => {
  const data = await import("./src/data/generated/themes.js");
  return batchPaths(data, theme, themes.indexOf(theme as never));
};

const migratedOrderPaths = (theme: string) => async (): Promise<string[]> => {
  const data = await import("./src/data/generated/themes.js");
  return orderPaths(data, theme, themes.indexOf(theme as never));
};

const themeOrder = (): Record<string, string>[] =>
  themes.filter((theme: string) => !isMigrated(theme)).map((theme: string) => ({ theme }));

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
      // Migrated theme folders (static /home /credits /levels are auto-discovered;
      // only their still-dynamic level routes need concrete paths).
      "/4ymm/levels/$batchNumber": migratedBatchPaths("4ymm"),
      "/4ymm/levels/$batchNumber/$order": migratedOrderPaths("4ymm"),
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
