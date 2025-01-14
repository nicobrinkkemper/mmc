import { Worker } from "node:worker_threads";
import { resolve } from "path";
//
/**
 * Coordinates the startup of RSC and SSR servers for the application
 */
import { spawn } from "child_process";
import { root } from "./constants.mjs";

function logLine(data: Buffer | string, identifier: string = "") {
  const prettyData = data
    .toString()
    .replace(/\n/g, "\n\t")
    .replace("GET (node       )", "GET");
  if (!identifier) return prettyData;
  return `[${identifier}] ${prettyData}`;
}

/**
 * Handles server process errors and logging
 */
function handleServerProcess(process: any, name: string) {
  process.stdout.on("data", (data: Buffer) => {
    console.info(logLine(data, name));
  });

  process.stderr.on("data", (data: Buffer) => {
    console.error(logLine(data, `${name} Error`));
  });

  process.on("error", (error: Error) => {
    console.error(`${name} process error:`, error);
  });

  process.on("exit", (code: number) => {
    if (code !== 0) {
      console.error(`${name} process exited with code ${code}`);
    }
  });
}

function startServer(
  name: "RSC" | "SSR",
  options: {
    script: string;
    port: number;
    nodeOptions: string;
  }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const server = spawn(
      process.execPath,
      [`./dist/server/${options.script}`],
      {
        env: {
          ...process.env,
          NODE_OPTIONS: options.nodeOptions,
        },
      }
    );

    handleServerProcess(server, name);

    // Add cleanup on process exit
    const cleanup = () => {
      server.kill();
    };
    process.on("exit", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGINT", cleanup);

    server.stdout.on("data", (data) => {
      if (
        data
          .toString()
          .includes(`listening on http://localhost:${options.port}`)
      ) {
        resolve();
      }
    });

    server.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`${name} server exited with code ${code}`));
      }
    });
  });
}

function startRsc(): Promise<void> {
  return startServer("RSC", {
    script: "rsc-server.js",
    port: 3003,
    nodeOptions:
      "--conditions react-server --experimental-json-modules --trace-warnings --enable-source-maps",
  });
}

function startSsr(): Promise<void> {
  return startServer("SSR", {
    script: "ssr-server.js",
    port: 3001,
    nodeOptions: "--experimental-json-modules --enable-source-maps",
  });
}

/**
 * Main function to start both servers in the correct order
 */
async function main() {
  try {
    console.log("Starting RSC server...");
    await startRsc();

    console.log("Starting SSR server...");
    await startSsr();

    console.log("🚀 All servers started successfully!");
    console.log("Application is ready at http://localhost:3001");

    if (process.argv.includes("crawl")) {
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
  } catch (error) {
    console.error("Failed to start servers:", error);
    process.exit(1);
  }
}

// Add proper error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

await main().catch((error) => {
  console.error("Failed to start servers:", error);
  process.exit(1);
});
