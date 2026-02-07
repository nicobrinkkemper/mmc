import { join } from "node:path";
import { metricWatcher } from "vite-plugin-react-server/metrics";
import {
  credits,
  levels,
  notfound,
  themeKeys,
  themes,
} from "./src/config/themeConfig.js";
import { getThemePathInfo } from "./src/data/getThemePathInfo.js";

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
  const { route } = getThemePathInfo(url);
  const folder = route === "/" ? "page" : `page${route.replace(/:/g, "_")}`;
  const path = join("src", folder, fileName);
  return path;
};

// process.env.GITHUB_ACTIONS = "true";
export const config = {
  moduleBase: "src",
  publicOrigin: process.env.VITE_PUBLIC_ORIGIN,
  moduleBaseURL: process.env.VITE_BASE_URL || "/",
  verbose: false,
  rscTimeout: 30000, // 30 seconds for large projects
  htmlTimeout: 60000, // 60 seconds for large projects
  fileWriteTimeout: 30000, // 30 seconds for large projects
  Page: createRouter("page.tsx"),
  props: createRouter("props.ts"),
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
    pages: pages,
  },
};
