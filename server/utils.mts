import { exec } from "child_process";
import type { Request } from "express";
import type { Server } from "node:http";
import { parse, relative } from "node:path";

/** Set of paths that have been processed to avoid duplicates */
export const visited = new Set<string>();

/** Helper to assert type safety for JSDOM Document */
export function assertIsDocument(x: unknown): asserts x is Document {
  if (!x || typeof x !== "object" || !("documentElement" in x)) {
    throw new Error(`Expected Document but got: ${x}`);
  }
}

export function assertIsHead(x: unknown): asserts x is HTMLHeadElement {
  if (!x || typeof x !== "object" || !("innerHTML" in x)) {
    throw new Error(`Expected Document but got: ${x}`);
  }
}

/** Format progress bar */
export function formatProgress(
  current: number,
  total: number,
  errors: number = 0,
  status: string = ""
): string {
  const width = 30;
  const percent = current / total;
  const filled = Math.round(width * percent);
  const empty = width - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  const statusSymbol =
    status === "active"
      ? "*"
      : status === "done"
      ? "√"
      : status === "error"
      ? "x"
      : " ";
  const errorText = errors > 0 ? ` (${errors} failed)` : "";
  return `${statusSymbol} [${bar}] ${current}/${total}${errorText}`;
}

/** Ensure HTML document has DOCTYPE declaration */
export function ensureDoctype(html: string = ""): string {
  if (html === "") {
    return "<!doctype html><html><head></head><body>There's nothing here</body></html>";
  }
  if (!html.startsWith("<!DOCTYPE")) {
    return "<!DOCTYPE html>\n" + html;
  }
  return html;
}

// Create the reference for the "client component" / "server function"
export const createReference = (e: string, path: string, directive: string) => {
  // Ensure path is relative to public directory and uses correct extension
  const id = `/${relative(".", path)
    .replace(/^src/, "") // Remove src prefix
    .replace(/\.[^/.]+$/, "")}#${e}`; // Remove extension and add export name

  const mod = `${
    e === "default" ? parse(path).base.replace(/\.[^/.]+$/, "") : e
  }_${e}`;

  return directive === "client"
    ? `${
        e === "default" ? "export default {" : `export const ${e} = {`
      }$$typeof:Symbol.for("react.client.reference"),$$id:"${id}",$$async:true};`
    : `const ${mod}=()=>{throw new Error("Server only")};${mod}.$$typeof=Symbol.for("react.server.reference");${mod}.$$id="${id}";${mod}.$$bound=null;export{${mod} as ${e}};`;
};

// Pad a string to a certain length
export const pad = (str: string, n = 11) =>
  str.slice(0, n) + (n - str.length > 0 ? " ".repeat(n - str.length) : "");

// Log express traffic to the console
export const logger = (req: Request, _: unknown, next: Function) => (
  console.log(
    req.method,
    `(${pad(req.headers["user-agent"] ?? "Unknown")})`,
    `${req.headers["host"]?.split(":")[1]}`,
    `"${req.path}"`
  ),
  next()
);

// Add CORS headers to express response
export const cors = (req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-component");
  next();
};

export const killPort = (port: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    // For Unix-like systems
    exec(`lsof -ti:${port} | xargs kill`, (error) => {
      if (error) {
        // Try Windows command if Unix fails
        exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
          if (err || !stdout) {
            reject(new Error(`Could not find process on port ${port}`));
            return;
          }
          const pid = stdout.split(/\s+/)[4];
          exec(`taskkill /F /PID ${pid}`, (killError) => {
            if (killError) {
              reject(killError);
              return;
            }
            resolve();
          });
        });
        return;
      }
      resolve();
    });
  });
};

export const gracefulShutdown = async (server: Server, port: number) => {
  console.log("Starting graceful shutdown...");

  let isShutdown = false;

  // Hard timeout - force exit after 10 seconds
  const hardTimeout = setTimeout(() => {
    console.error("Forced exit after timeout");
    process.exit(1);
  }, 10000);

  try {
    // Close all existing connections
    server.closeAllConnections();

    // Try graceful shutdown first
    await Promise.race([
      new Promise<void>((resolve) => {
        server.close(() => {
          console.log("Server closed gracefully");
          isShutdown = true;
          resolve();
        });
      }),
      // Fallback to force kill after 5s
      new Promise<void>(async (resolve) => {
        await new Promise((r) => setTimeout(r, 5000));
        if (!isShutdown) {
          console.log("Force killing port...");
          await killPort(port);
        }
        resolve();
      }),
    ]);
  } catch (e) {
    console.error("Shutdown error:", e);
  } finally {
    clearTimeout(hardTimeout);
    process.exit(0);
  }
};

export const isPortInUse = async (port: number): Promise<boolean> => {
  try {
    await killPort(port);
    return true;
  } catch (e) {
    return false;
  }
};
