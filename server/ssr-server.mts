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
import { htmlAssets } from "./htmlAssets.mjs";
import { cors, logger } from "./utils.mjs";

console.log(`Listening on http://localhost:${ssr_port}`);

express()
  .use(logger)
  .use(cors)
  .use("/", express.static(build))
  .use("/dist", express.static(modules))
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
  .use(cookieParser() as RequestHandler)
  .get(/.*/, async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MMC</title>
    <link rel="stylesheet" href="${htmlAssets.css[0]}">
</head>
<body><div id="root">`);

    const url = new URL(req.url, `http://${req.headers.host}`);
    url.port = rsc_port.toString();

    const rsc = await fetch(url);
    const rscStream = Readable.fromWeb(rsc.body as unknown as ReadableStream);

    let App: FunctionComponent = () => {
      return use(createFromNodeStream(rscStream, modules, moduleBaseURL));
    };

    const stream = renderToPipeableStream(createElement(App), {
      bootstrapModules: ["/dist/_client.js"],
      importMap: {
        imports: {
          react: "https://esm.sh/react@19.0.0?dev",
          "react-dom": "https://esm.sh/react-dom@19.0.0?dev",
          "react-dom/client": "https://esm.sh/react-dom@19.0.0/client?dev",
          "react-server-dom-esm/client":
            "/node_modules/react-server-dom-esm/esm/react-server-dom-esm-client.browser.development.js",
        },
      },
      onError(error) {
        console.error(error);
        res.status(500).end();
      },
      onAllReady() {
        stream.pipe(res);
        res.write("</div></body></html>");
      },
    });
  })
  .listen(ssr_port);

new Worker(resolve(root, "dist/server/export.mjs")).addListener("close", (_) =>
  console.log("Pages exported successfully! 🚀")
);
