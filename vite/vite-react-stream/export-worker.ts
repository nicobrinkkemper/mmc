import { Worker } from "worker_threads";
import type { BaseProps, BuildConfig } from "./types";

export async function startExport<T extends BaseProps>(config: BuildConfig<T>) {
  return new Promise((resolve, reject) => {
    console.log("\n[Export] Starting RSC export...\n");

    const worker = new Worker("./dist/rsc-worker.js", {
      stdout: true,
      stderr: true,
    });

    worker.stdout?.pipe(process.stdout);
    worker.stderr?.pipe(process.stderr);

    worker.on("message", (message) => {
      if (message === "done") {
        console.log("\n[Export] RSC export completed successfully!\n");
        resolve(undefined);
      }
    });

    worker.on("error", (error) => {
      console.error("\n[Export] Worker error:", error, "\n");
      reject(error);
    });

    // Just send the pages file path - worker will handle the rest
    worker.postMessage({
      pages: config.pages,
      output: config.output,
    });
  });
}
