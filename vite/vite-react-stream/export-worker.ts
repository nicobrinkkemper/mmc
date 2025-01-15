import { join } from "node:path";
import { Worker } from "node:worker_threads";
import type { BaseProps, BuildConfig } from "./types.js";

export async function startExport<T extends BaseProps>(config: BuildConfig<T>) {
  return new Promise((resolve, reject) => {
    console.log("\n[Export] Starting RSC export...\n");

    const workerPath = join(process.cwd(),
      config.output?.worker ?? 'dist/server/rsc-worker.js'
    );

    const worker = new Worker(workerPath, {
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

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    worker.postMessage({
      pages: config.pages,
      output: config.output,
      options: {
        moduleBase: config.options?.moduleBase,
        pageExportName: config.options?.pageExportName,
        propsExportName: config.options?.propsExportName
      }
    });
  });
}
