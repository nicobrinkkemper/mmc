import { Window } from "happy-dom";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { Readable } from "node:stream";
import { parentPort } from "node:worker_threads";
import { renderToPipeableStream } from "react-dom/server";
import { createFromNodeStream } from "react-server-dom-esm/client.node";
import type { RenderState, WorkerMessage } from "./types.js";

if (!parentPort) {
  throw new Error("This module must be run as a worker");
}

// Track active renders
const activeRenders = new Map<string, RenderState>();
let isShuttingDown = false;

// Handle incoming messages
parentPort.on("message", async (message: WorkerMessage) => {
  if (message.type === "SHUTDOWN") {
    isShuttingDown = true;
    // Wait for all renders to complete
    while (activeRenders.size > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    process.exit(0);
  }

  if (!parentPort) {
    throw new Error("No parent port available");
  }

  try {
    switch (message.type) {
      case "RSC_CHUNK": {
        const { chunk, buffer, id, ...rest } = message;

        // Skip if already rendered
        let renderState = activeRenders.get(id);
        if (renderState?.rendered) {
          return;
        }
        // Initialize render state
        if (!renderState) {
          renderState = {
            chunks: [],
            buffers: [],
            complete: false,
            rendered: false,
            id: id,
            ...rest,
          };
          activeRenders.set(id, renderState);
        }
        // Add chunk
        if (chunk) renderState.chunks.push(chunk);
        if (buffer) renderState.buffers.push(buffer);
        break;
      }

      case "RSC_END": {
        const { id } = message;
        const renderState = activeRenders.get(id);

        if (!renderState) {
          console.warn(`[Worker] No active render to end: ${id}`);
          return;
        }

        if (renderState.rendered) {
          return;
        }

        await startRender(id);
        break;
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    parentPort?.postMessage({
      type: "ERROR",
      error: errorMessage,
    });
  }
});

async function writeHtmlFile(content: Buffer, renderState: RenderState) {
  const outputPath = renderState.htmlOutputPath;

  await mkdir(dirname(outputPath), { recursive: true });
  const writeStream = createWriteStream(outputPath);

  // Create readable stream from RSC content
  const rscStream = Readable.from(content);

  // Create RSC node stream
  const reactElements = await createFromNodeStream(
    rscStream,
    renderState.moduleBasePath,
    renderState.moduleBaseURL
  );

  return new Promise<void>((resolve, reject) => {
    // Create pipe with onAllReady callback
    const { pipe, abort } = renderToPipeableStream(
      reactElements as React.ReactNode,
      {
        onAllReady() {
          pipe(writeStream);
          writeStream.on("finish", () => {
            parentPort?.postMessage({
              type: "WROTE_FILE",
              outputPath,
              route: renderState.id,
            });
            writeStream.on("error", (error) => {
              console.error("[Worker] Write error at", error);
              abort();
              reject(error);
            });
            resolve();
          });
        },
        onError(error) {
          console.error("[Worker] Render error at", error);
          reject(error);
        },
      }
    );
    if (isShuttingDown) {
      abort();
    }
  });
}

async function startRender(id: string) {
  const render = activeRenders.get(id);
  if (!render || !parentPort) return;

  try {
    // Combine chunks into buffer
    const content = Buffer.concat(
      render.chunks.map((chunk) => {
        if (Array.isArray(chunk)) {
          return Buffer.from(chunk);
        }
        return Buffer.from(chunk);
      })
    );

    // Write RSC content
    await writeHtmlFile(content, render);
  } catch (error) {
    parentPort.postMessage({
      type: "ERROR",
      route: id,
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    activeRenders.delete(id);
  }
}

// Signal ready only after loader is registered
parentPort.postMessage({ type: "READY" });

// Initialize happy-dom window
const window = new Window({
  url: "http://localhost",
  width: 1024,
  height: 768,
});

// Set up global objects that React might need
(global as any).window = window;
(global as any).document = window.document;
