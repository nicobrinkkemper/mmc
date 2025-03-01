import { join } from "node:path";
import type { StreamPluginOptions } from "vite-plugin-react-server";
import {
  credits,
  levels,
  notfound,
  themeKeys,
  themes,
} from "./src/config/themeConfig.js";
import { getThemePathInfo } from "./src/data/getThemePathInfo.js";
import { Html } from "./src/Html.server.js";

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

export const config = {
  moduleBase: "src",
  Page: createRouter("page.tsx"),
  props: createRouter("props.ts"),
  Html: Html,
  pageExportName: "Page",
  propsExportName: "props",
  build: {
    pages: pages,
  },
} as StreamPluginOptions;
