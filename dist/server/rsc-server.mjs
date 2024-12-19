import cookieParser from "cookie-parser";
import express from "express";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { routes } from "../src/data/routes.js";
import { assets, moduleBaseURL, modules, node_modules, rsc_port, } from "./constants.js";
import { RenderRsc } from "./render-rsc.js";
import { cors, logger } from "./utils.mjs";
console.log(`Listening on http://localhost:${rsc_port}`);
const app = express();
app
    .use(logger)
    .use(cors)
    .use(cookieParser())
    .use("/dist", express.static(modules))
    .use("/assets", express.static(assets))
    .use("/src", express.static("src", {
    setHeaders: (res) => {
        res.setHeader("Content-Type", "application/typescript");
    },
}))
    .use("/node_modules", express.static(node_modules, {
    setHeaders: (res) => {
        res.setHeader("Content-Type", "application/javascript");
    },
}))
    .get("/*", async (req, res) => {
    const normalizedPath = req.path.replace(/\/$/, "");
    const route = routes.find((r) => r.path === normalizedPath);
    if (!route) {
        console.log("Route not found, using 404");
        renderToPipeableStream(RenderRsc(routes[routes.length - 1]), moduleBaseURL).pipe(res);
    }
    else {
        console.log("Route found:", route.path);
        renderToPipeableStream(RenderRsc(route), moduleBaseURL).pipe(res);
    }
})
    .listen(rsc_port);
//# sourceMappingURL=rsc-server.mjs.map