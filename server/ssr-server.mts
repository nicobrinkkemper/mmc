import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";
import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { createElement, FunctionComponent, use } from "react";
import { renderToPipeableStream } from "react-dom/server.node";
import { createFromNodeStream } from "react-server-dom-esm/client";
import {
  build,
  moduleBaseURL,
  modules,
  node_modules,
  publicUrl,
  rsc_port,
  ssr_port,
} from "./constants.js";
import { htmlAssets } from "./htmlAssets.mjs";
import { cors, logger } from "./utils.mjs";

console.log(`Listening on http://localhost:${ssr_port}${publicUrl}`);

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
    const stream = renderToPipeableStream(createElement(App), {
      bootstrapModules: [htmlAssets.main],
      importMap: {
        imports: {
          react: "https://esm.sh/react@19.0.0-beta-26f2496093-20240514",
          "react-dom":
            "https://esm.sh/react-dom@19.0.0-beta-26f2496093-20240514",
          "react-dom/":
            "https://esm.sh/react-dom@19.0.0-beta-26f2496093-20240514/",
          "react/": "https://esm.sh/react@19.0.0-beta-26f2496093-20240514/",
          "react-server-dom-esm/client":
            "/node_modules/react-server-dom-esm/esm/react-server-dom-esm-client.browser.production.js",
          "@jsxImportSource":
            "https://esm.sh/react@19.0.0-beta-26f2496093-20240514",
        },
      },
      onError(error) {
        console.error(error);
        res.status(500).end();
      },
      onAllReady() {
        res.setHeader("Content-Type", "text/html");
        stream.pipe(res);
      },
    });
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