import { join } from "node:path";
import { metricWatcher } from "vite-plugin-react-server/metrics";
import type { StreamPluginOptions } from "vite-plugin-react-server/types";
import {
  credits,
  levels,
  notfound,
  themeKeys,
  themes,
} from "./src/config/themeConfig.js";
import { getThemePathInfo } from "./src/data/getThemePathInfo.js";
import { Html } from "./src/Html.js";
import { MmcCssCollector } from "./src/MmcCssCollector.js";
const themeLevelPages = async (): Promise<string[]> => {
  const themeData = await import("./src/data/generated/themes.js");
  const batches = themes.flatMap((theme: string, i: number) => {
    const { batches } = themeData[themeKeys[i]];
    return batches.flatMap(
      (batch: { batchNumber: number; levels: { order: string }[] }) => [
        `/${theme}/${levels}/${batch.batchNumber}`,
        ...batch.levels.map(
          (level) => `/${theme}/${levels}/${batch.batchNumber}/${level.order}`
        ),
      ]
    );
  });
  return [...batches];
};

const pages = async (): Promise<string[]> => {
  const rest = await themeLevelPages();
  return [
    "/",
    `/${notfound}`,
    ...themes.flatMap((theme) => [
      `/${theme}`,
      `/${theme}/${credits}`,
      `/${theme}/${levels}`,
    ]),
    ...rest,
  ];
};

const createRouter = (fileName: string) => (url: string) => {
  url = url.replace("index.rsc", "");
  const { route } = getThemePathInfo(url);
  const folder = route === "/" ? "page" : `page${route.replace(/:/g, "_")}`;
  return join("src", folder, fileName);
};

// process.env.GITHUB_ACTIONS = "true";
export const config = {
  moduleBase: "src",
  moduleBasePath: process.env.VITE_BASE_URL ?? "/",
  moduleBaseURL: process.env.VITE_BASE_URL,
  publicOrigin: process.env.VITE_PUBLIC_ORIGIN,
  Page: createRouter("page.tsx"),
  props: createRouter("props.ts"),
  CssCollector: MmcCssCollector,
  Html: Html,
  onMetrics: metricWatcher({
    maxTime: 200,
    warnOnly: false, // will show the duration info for each page
  }),
  pageExportName: "Page",
  propsExportName: "props",
  serverEntry: "src/server.tsx",
  build: {
    pages: pages,
  },
} as StreamPluginOptions;
