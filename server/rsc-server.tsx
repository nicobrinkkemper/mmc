import compression from "compression";
import cookieParser from "cookie-parser";
import express, { type RequestHandler } from "express";
import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parentPort } from "node:worker_threads";
import { join } from "path";
import React from "react";
import {
  decodeReply,
  renderToPipeableStream,
} from "react-server-dom-esm/server.node";
import { getThemePathInfo } from "../src/data/getThemePathInfo.js";
import {
  moduleBase,
  moduleBasePath,
  moduleRootPath,
  root,
  rsc_port,
} from "./constants.mjs";
import { RenderPage } from "./Render.js";
import { cors, gracefulShutdown, isPortInUse, logger } from "./utils.mjs";

console.log("Starting initialization...");

const dirname = fileURLToPath(new URL(".", import.meta.url));
console.log("Server dirname:", dirname);
console.log("Module base path:", moduleBasePath);

// Register module hooks in order of specificity
console.log("Registering module hooks...");
try {
  register("./dist/server/cssModuleHook.mjs", pathToFileURL("./dist"));
  console.log("Registered CSS module hook");
  register("./dist/server/jsonModuleHook.mjs", pathToFileURL("./dist"));
  console.log("Registered JSON module hook");
  register("./dist/server/reactEsmHook.mjs", pathToFileURL("./dist"));
  console.log("Registered React ESM hook");
} catch (err) {
  console.error("Error registering hooks:", err);
  throw err;
}

console.log("Creating Express app...");
const app = express();

// Add CORS middleware first
app.use(logger);
app.use(cors);

// Add compression middleware
app.use(compression());

// Serve both compiled and source files
app.use("/src", express.static(moduleRootPath));
app.use("/src", express.static(join(root, "src"))); // Add source directory

async function processServerFunction(body: unknown) {
  console.log("Processing server function:", body);
  // Convert array to string for decodeReply
  const bodyString = JSON.stringify(body);
  const [id, args] = await decodeReply(bodyString, moduleBasePath);
  console.log("Decoded ID:", id);
  console.log("Decoded args:", args);
  return args;
}

console.log("Setting up routes...");
app
  .use(cookieParser() as RequestHandler)
  .use(express.json())
  .post("*", async (req, res) => {
    console.log("Received POST request:", req.path);
    try {
      // Get raw body as string
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(chunk));

      const body = await new Promise<string>((resolve, reject) => {
        req.on("end", () => resolve(Buffer.concat(chunks).toString()));
        req.on("error", reject);
      });

      console.log("Received POST body:", body);
      res.setHeader("Content-Type", "application/json");

      const result = await processServerFunction(body);
      console.log("Server function result:", result);
      res.json({ returnValue: result });
    } catch (err) {
      console.error("Failed to process POST request:", err);
      res.status(500).json({ error: "Server Error" });
    }
  })
  .get("*", async (req, res) => {
    try {
      const stream = renderToPipeableStream(
        <RenderPage pathInfo={getThemePathInfo(req.url)} />,
        "/" + moduleBase
      );
      stream.pipe(res);
    } catch (err) {
      console.error(`Failed to process ${req.path}:`, err);
      res.status(500).send("Server Error");
    }
  });

// check if port is already in use
const portInUse = await isPortInUse(rsc_port);
if (portInUse) {
  console.error(`Port ${rsc_port} is already in use`);
  process.exit(1);
}
console.log("Starting server on port", rsc_port);
const server = app.listen(rsc_port, () => {
  console.log(`Server listening on http://localhost:${rsc_port}`);
  // Signal completion to parent process if running as worker
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
    await gracefulShutdown(server, rsc_port);
  });
});
