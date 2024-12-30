import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { getThemePathInfo } from "../src/data/getThemePathInfo.js";
import { Html } from "../src/layout/Html.js";
import { RenderRoute } from "../src/router/RenderRoute.js";
import {
  build,
  moduleBaseURL,
  modules,
  publicUrl,
  rsc_port,
} from "./constants.js";
import { htmlAssets } from "./htmlAssets.mjs";
import { cors, logger } from "./utils.mjs";

console.log(`Listening on http://localhost:${rsc_port}${publicUrl}`);

const app = express();
// Remove basePath from requests before serving
app.use((req, _res, next) => {
  if (publicUrl && req.url.startsWith(publicUrl)) {
    req.url = req.url.slice(publicUrl.length) || "/";
  }
  next();
});
app
  .use(logger)
  .use(cors)
  .use(cookieParser() as RequestHandler)
  .use("/dist/src", express.static(modules))
  .use(
    "/node_modules",
    express.static("node_modules", {
      setHeaders: (res) => {
        res.setHeader("Content-Type", "application/javascript");
      },
    })
  )
  .get("/*", async (req, res, next) => {
    const normalizedPath = req.path.replace(/\/$/, "") || "/";

    const pathInfo = getThemePathInfo(normalizedPath as ValidPath);
    if (!pathInfo) {
      return next();
    }

    renderToPipeableStream(
      RenderRoute({
        pathInfo: pathInfo as any,
        layout: Html,
        layoutProps: {
          assets: {
            css: htmlAssets.css,
          },
        },
      })!,
      moduleBaseURL
    ).pipe(res);
  })
  .use("/", express.static(build))
  .listen(rsc_port);
