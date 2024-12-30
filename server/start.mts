import { Worker } from "node:worker_threads";
import { resolve } from "path";
import "../startup/env.mjs";
//
/**
 * Coordinates the startup of RSC and SSR servers for the application
 */
import { spawn } from "child_process";
import { root } from "./constants.js";

function logLine(data: string, identifier: string = "") {
  const prettyData = data
    .toString()
    .replace(/\n/g, "\n\t")
    .replace("GET (node       )", "GET");
  if (!identifier) return prettyData;
  return `[${identifier}] ${prettyData}`;
}

/**
 * Starts the React Server Components (RSC) server
 * @returns Promise that resolves when the RSC server is ready
 */
function startRsc(): Promise<void> {
  return new Promise((resolve) => {
    const rsc = spawn("node", ["./dist/server/rsc-server.mjs"], {
      env: {
        ...process.env,
        NODE_OPTIONS:
          "--conditions=react-server --experimental-json-modules --enable-source-maps --loader ./dist/server/moduleHook.dev.mjs",
      },
    });

    rsc.stdout.on("data", (data) => {
      console.info(logLine(data, "RSC"));
      if (data.toString().includes("Listening on http://localhost:3002")) {
        resolve();
      }
    });

    rsc.stderr.on("data", (data) => {
      console.error(logLine(data, "RSC-error"));
    });
  });
}

/**
 * Starts the Server-Side Rendering (SSR) server
 * @returns Promise that resolves when the SSR server is ready
 */
function startSsr(): Promise<void> {
  return new Promise((resolve) => {
    const ssr = spawn("node", ["./dist/server/ssr-server.mjs"], {
      env: {
        ...process.env,
        NODE_OPTIONS:
          "--experimental-json-modules --enable-source-maps --loader ./dist/server/moduleHook.dev.mjs",
      },
    });

    ssr.stdout.on("data", (data) => {
      console.info(logLine(data));
      if (data.toString().includes("Listening on http://localhost:3001")) {
        resolve();
      }
    });

    ssr.stderr.on("data", (data) => {
      console.error(logLine(data, "SSR-error"));
    });
  });
}

/**
 * Main function to start both servers in the correct order
 */
async function main() {
  console.log("Starting RSC server...");
  await startRsc();

  console.log("Starting SSR server...");
  await startSsr();

  console.log("🚀 All servers started successfully!");
  console.log("Application is ready at http://localhost:3001");

  if (process.argv.includes("crawl")) {
    console.log("Crawling pages...");
    const worker = new Worker(resolve(root, "dist/server/export.mjs"));

    worker.on("message", (message) => {
      if (message === "done") {
        console.log("Pages exported successfully! 🚀");
        worker.terminate();
        process.exit(0);
      }
    });

    worker.on("error", (error) => {
      console.error("Worker error:", error);
      worker.terminate();
      process.exit(1);
    });
  }
}

main().catch((error) => {
  console.error("Failed to start servers:", error);
  process.exit(1);
});
