import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createElement } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";

const meta = JSON.parse(readFileSync("build/meta.json", "utf-8"));
const moduleBaseURL = "/build/";

const pageMap = {
  credits: "CreditsPage",
  index: "HomePage",
  levels: "LevelBatchesPage",
  "levels/[number]": "LevelBatchPage",
  "level/[number]/[number]": "LevelPage",
  notfound: "NotFoundPage",
};

if (process.argv.includes("crawl")) {
  for (const path of meta.static) {
    const pagePath = path || "index";
    const hasComponentName = pagePath in pageMap;
    const componentName = hasComponentName
      ? pageMap[pagePath as keyof typeof pageMap]
      : "NotFoundPage";
    console.log(`Rendering ${pagePath} ${componentName}`);

    const Page = (
      await import(
        `${resolve("dist/src/page")}/${componentName}/${componentName}.js`
      )
    ).default;
    const stream = renderToPipeableStream(createElement(Page), moduleBaseURL);

    mkdirSync(`build/static/${pagePath}`, { recursive: true });
    writeFileSync(`build/static/${pagePath}/index.html`, stream);
  }
}
