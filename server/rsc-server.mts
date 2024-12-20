import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { routes } from "../src/data/routes.js";
import { build, moduleBaseURL, modules, rsc_port } from "./constants.js";
import { RenderRsc } from "./render-rsc.js";
import { cors, logger } from "./utils.mjs";

console.log(`Listening on http://localhost:${rsc_port}`);

const app = express();

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

    if (normalizedPath.includes(".")) {
      return next();
    }

    console.log("Looking for route:", normalizedPath);

    const route = routes.find((r) => {
      const routePath = r.path.replace(/\/$/, "") || "/";
      return routePath === normalizedPath;
    });

    if (!route) {
      const notFoundRoute = routes[routes.length - 1];
      renderToPipeableStream(
        RenderRsc(notFoundRoute as any),
        moduleBaseURL
      ).pipe(res);
    } else {
      renderToPipeableStream(RenderRsc(route as any), moduleBaseURL).pipe(res);
    }
  })
  .use("/", express.static(build))
  .listen(rsc_port);
