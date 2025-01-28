import { Window } from "happy-dom";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import type { Writable } from "node:stream";
import { parentPort } from "node:worker_threads";
import type { PipeableStream } from "react-server-dom-esm/server.node";
import { streamToFile } from "./streamToFile.js";
import type { RenderState, WorkerMessage } from "./types.js";

if (!parentPort) {
  throw new Error("This module must be run as a worker");
}

// Track active renders
const activeRenders = new Map<string, RenderState>();
const activeStreams = new Map<string, PipeableStream>();
const activeWrites = new Map<string, Writable>();

async function shutdown() {
  console.log("[Worker] Shutting down forcefully");
  while (activeRenders.size > 0) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  for (const stream of activeStreams.values()) {
    stream.abort();
  }
  for (const writeStream of activeWrites.values()) {
    writeStream.destroy();
  }
  process.exit(0);
}
// Handle incoming messages
parentPort.on("message", async (message: WorkerMessage) => {
  if (message.type === "SHUTDOWN") {
    await shutdown();
  }
  if (!parentPort) {
    throw new Error("No parent port available");
  }
  try {
    switch (message.type) {
      case "RSC_CHUNK": {
        const { chunk, id, ...rest } = message;
        // Skip if already rendered
        let renderState = activeRenders.get(id);
        if (renderState?.rendered) {
          return;
        }
        // Initialize render state
        if (!renderState) {
          renderState = {
            chunks: [],
            complete: false,
            rendered: false,
            id: id,
            ...rest,
          };
          activeRenders.set(id, renderState);
        }
        // Add chunk
        if (chunk) renderState.chunks.push(chunk);
        break;
      }

      case "RSC_END": {
        const { id } = message;
        const render = activeRenders.get(id);

        if (!render || !parentPort || render.rendered) return;

        try {
          // Write RSC content
          await mkdir(dirname(render.htmlOutputPath), { recursive: true });
          const { stream, writeStream } = streamToFile(render);
          activeStreams.set(id, stream);
          activeWrites.set(id, writeStream);
          writeStream.on("finish", () => {
            activeStreams.delete(id);
            activeWrites.delete(id);
          });
          writeStream.on("error", () => {
            activeStreams.delete(id);
            activeWrites.delete(id);
            stream.abort();
          });
        } catch (error) {
          activeRenders.delete(id);
          activeStreams.delete(id);
          activeWrites.delete(id);
          throw error;
        } finally {
          activeRenders.delete(id);
        }
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
