import { join } from "node:path";
import { metricWatcher } from "vite-plugin-react-server/metrics";
import type {
  DefaultInterface,
  StreamPluginOptions,
} from "vite-plugin-react-server/types";
import {
  credits,
  levels,
  notfound,
  themeKeys,
  themes,
} from "./src/config/themeConfig.js";
import { getThemePathInfo } from "./src/data/getThemePathInfo.js";
import "./types/html.d.ts";
import "./types/page-props.d.ts";

export interface MMCInterface
  extends Omit<DefaultInterface, "RootExportName" | "HtmlExportName"> {
  PageProps: PageProps; // your custom PageProps type
  RootExportName: "MmcRoot"; // Brand our root component
  HtmlExportName: "MmcHtml"; // Brand our html component
}

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
  moduleBasePath: "/",
  moduleBaseURL: process.env.VITE_BASE_URL ?? "/",
  publicOrigin: process.env.VITE_PUBLIC_ORIGIN,
  verbose: false,
  Page: createRouter("page.tsx"),
  props: createRouter("props.ts"),
  Root: "src/MmcRoot.tsx",
  Html: "src/MmcHtml.tsx",
  pageExportName: "Page",
  propsExportName: "props",
  htmlExportName: "MmcHtml",
  rootExportName: "MmcRoot",
  onMetrics: metricWatcher({
    warnOnly: false,
    warn: (...args) => console.warn(...args),
    info: (...args) => console.info(...args),
  }),
  serverEntry: "src/server.tsx",
  css: {
    inlineCss: true,
  },
  build: {
    pages: pages,
  },
} satisfies StreamPluginOptions<MMCInterface>;
