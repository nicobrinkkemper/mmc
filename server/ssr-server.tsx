"use client";
import cookieParser from "cookie-parser";
import express, { type RequestHandler } from "express";
import { Readable } from "node:stream";
import type { ReadableStream } from "node:stream/web";
import { parentPort } from "node:worker_threads";
import { join } from "path";
import React, { createElement, type FunctionComponent } from "react";
import { renderToPipeableStream } from "react-dom/server.node";
import { createFromNodeStream } from "react-server-dom-esm/client";
import {
  build,
  moduleBase,
  moduleRootPath,
  node_modules,
  root,
  rsc_port,
  ssr_port,
} from "./constants.mjs";
import { env } from "./env.mjs";
import { ESM_IMPORTS } from "./imports.mjs";
import { cors, gracefulShutdown, isPortInUse, logger } from "./utils.mjs";

/**
 * Server-Side Rendering (SSR) Server
 *
 * This server is responsible for:
 * 1. Receiving initial page requests
 * 2. Fetching RSC data from the RSC server
 * 3. Rendering the full HTML page with hydration data
 */

/**
 * Creates a React component that renders the full HTML page
 * using the RSC stream data
 */
const createPageComponent =
  (rscStream: Readable): FunctionComponent =>
  () => {
    const node = React.use<[React.ReactNode, React.ReactNode]>(
      createFromNodeStream(rscStream, moduleRootPath, moduleBase)
    );

    if (!node || !Array.isArray(node) || node.length !== 2) {
      return node;
    }

    const [Head, Body] = node;
    return (
      <html>
        <head>{Head}</head>
        <body>
          <div id="root">{Body ?? null}</div>
        </body>
      </html>
    );
  };

const app = express();

// Base path handling
app.use((req, _res, next) => {
  if (env["VITE_PUBLIC_URL"] && req.url.startsWith(env["VITE_PUBLIC_URL"])) {
    req.url = req.url.slice(env["VITE_PUBLIC_URL"].length) || "/";
  }
  next();
});

app
  .use(logger)
  .use(cors)
  .use(cookieParser() as RequestHandler)
  .use("/node_modules", express.static(node_modules))
  // Redirect .tsx requests to Vite dev server
  .use((req, res, next) => {
    if (req.path.endsWith(".tsx") || req.path.endsWith(".ts")) {
      return res.redirect(`http://localhost:3000${req.path}`);
    }
    next();
  })
  .use("/src", express.static(moduleRootPath))
  .use("/src", express.static(join(build, "assets/src")))
  .use("/src", express.static(join(root, "src")))
  .get("*", async (req, res, next) => {
    // Skip non-page requests
    if (req.path.includes(".")) {
      return next();
    }

    console.log("[SSR] Rendering page:", req.url);

    try {
      // Fetch RSC data
      const url = new URL(req.url, `http://${req.headers.host}`);
      url.port = rsc_port.toString();
      const rsc = await fetch(url);

      console.log("[SSR] RSC status:", rsc.status);
      if (!rsc.ok) {
        const text = await rsc.text();
        console.error("[SSR] RSC error response:", text);
        throw new Error(`RSC server error: ${rsc.status}`);
      }

      // Convert RSC response to Node stream
      const rscStream = Readable.fromWeb(rsc.body as ReadableStream);
      const App = createPageComponent(rscStream);

      // Render the full page
      const stream = renderToPipeableStream(createElement(App), {
        bootstrapModules: ["http://localhost:3001/src/ssr.js"],
        importMap: { imports: ESM_IMPORTS },
        onError(error: any) {
          console.error("[SSR] Stream error:", error);
          if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
          }
        },
        onAllReady() {
          if (!res.headersSent) {
            res.setHeader("Content-Type", "text/html");
            stream.pipe(res);
          }
        },
      });
    } catch (error) {
      console.error("[SSR] Top-level error:", error);
      if (!res.headersSent) {
        res.status(500).send("Internal Server Error");
      }
    }
  });

// ONLY IF MAIN IMPORT IS FROM SERVER
if (import.meta.url.includes("ssr-server")) {
  const portInUse = await isPortInUse(ssr_port);
  if (portInUse) {
    console.error(`Port ${ssr_port} is already in use`);
    process.exit(1);
  }
  console.log("Starting server on port", ssr_port);
  const server = app.listen(ssr_port, () => {
    console.log(`Server listening on http://localhost:${ssr_port}`);
    if (parentPort) {
      parentPort.postMessage("done");
    }
  });

  // Handle various termination signals
  const signals = [
    "SIGTERM",
    "SIGINT",
    "uncaughtException",
    "unhandledRejection",
  ];
  signals.forEach((signal) => {
    process.on(signal, async (error) => {
      console.error(`${signal}:`, error);
      await gracefulShutdown(server, ssr_port);
    });
  });
}
