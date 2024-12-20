import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";
import { resolve } from "node:path";
import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { Worker } from "node:worker_threads";
import { createElement, FunctionComponent, use } from "react";
import { renderToPipeableStream } from "react-dom/server.node";
import { createFromNodeStream } from "react-server-dom-esm/client";
import {
  build,
  moduleBaseURL,
  modules,
  node_modules,
  root,
  rsc_port,
  ssr_port,
} from "./constants.js";
import { cors, logger } from "./utils.mjs";

console.log(`Listening on http://localhost:${ssr_port}`);
// ... other imports ...
import { getStaticData } from "../src/data/getStaticData.js";

express()
  .use(logger)
  .use(cors)
  .use(cookieParser() as RequestHandler)
  .get(/.*/, async (req, res, next) => {
    if (req.path.includes(".") && !req.path.endsWith(".html")) {
      return next();
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    url.port = rsc_port.toString();

    const rsc = await fetch(url);
    const rscStream = Readable.fromWeb(rsc.body as ReadableStream);

    let App: FunctionComponent = () => {
      return use(createFromNodeStream(rscStream, modules, moduleBaseURL));
    };

    /**
     * Render the full HTML document using the Html component
     */
    const stream = renderToPipeableStream(
      createElement(App, getStaticData(req.path as ValidPath) as any),
      {
        onError(error) {
          console.error(error);
          res.status(500).end();
        },
        onAllReady() {
          res.setHeader("Content-Type", "text/html");
          stream.pipe(res);
        },
      }
    );
  })
  .use("/", express.static(build))
  .use("/dist/src", express.static(modules))
  .use(
    "/src",
    express.static("src", {
      setHeaders: (res) => {
        res.setHeader("Content-Type", "application/typescript");
      },
    })
  )
  .use(
    "/node_modules",
    express.static(node_modules, {
      setHeaders: (res) => {
        res.setHeader("Content-Type", "application/javascript");
      },
    })
  )
  .listen(ssr_port);

new Worker(resolve(root, "dist/server/export.mjs")).addListener("close", (_) =>
  console.log("Pages exported successfully! 🚀")
);
