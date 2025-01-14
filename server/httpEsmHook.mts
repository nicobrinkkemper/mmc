/**
 * HTTP ESM Module Hook
 *
 * Handles remote ESM modules and HTTPS imports with caching
 */

import { promises as fs } from "fs";
import { createRequire } from "module";
import crypto from "node:crypto";
import https from "node:https";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ESM_IMPORTS } from "./imports.mjs";

const require = createRequire(import.meta.url);

// Cache configuration
const CACHE_DIR = path.join(process.cwd(), ".cache", "esm");

// Ensure cache directory exists
await fs.mkdir(CACHE_DIR, { recursive: true });

/**
 * Generates a cache key for a given URL
 */
function getCacheKey(url: string): string {
  return crypto.createHash("sha256").update(url).digest("hex");
}

/**
 * Fetches and caches remote module content
 */
async function fetchRemoteModule(url: string): Promise<string> {
  const cacheKey = getCacheKey(url);
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.mjs`);

  try {
    const cached = await fs.readFile(cachePath, "utf-8");
    console.log(`Cache hit for ${url}`);
    return cached;
  } catch (error) {
    console.log(`Cache miss for ${url}, fetching...`);
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", async () => {
            try {
              await fs.writeFile(cachePath, data);
              resolve(data);
            } catch (error) {
              console.error("Cache write failed:", error);
              resolve(data);
            }
          });
          res.on("error", reject);
        })
        .on("error", async (error) => {
          try {
            const cached = await fs.readFile(cachePath, "utf-8");
            console.log(`Network error, using cached version for ${url}`);
            resolve(cached);
          } catch {
            reject(error);
          }
        });
    });
  }
}

export async function resolve(
  specifier: string,
  context: any,
  nextResolve: any
) {
  // Handle explicit ESM imports
  if (ESM_IMPORTS[specifier as keyof typeof ESM_IMPORTS]) {
    return {
      shortCircuit: true,
      url: ESM_IMPORTS[specifier as keyof typeof ESM_IMPORTS],
      format: "module",
      conditions: context.conditions,
    };
  }

  // Handle node_modules relative imports
  if (
    context.parentURL?.includes("node_modules") &&
    specifier.startsWith(".")
  ) {
    const parentURL = new URL(context.parentURL);
    const resolvedPath = path.resolve(
      path.dirname(parentURL.pathname),
      specifier
    );
    return {
      shortCircuit: true,
      url: pathToFileURL(resolvedPath).href,
      format: "module",
      conditions: context.conditions,
    };
  }

  return nextResolve(specifier, context);
}

export async function load(url: string, context: any, nextLoad: any) {
  // Handle HTTPS imports
  if (url.startsWith("https://")) {
    const source = await fetchRemoteModule(url);
    return {
      format: "module",
      shortCircuit: true,
      source,
    };
  }

  // Handle file URLs
  if (url.startsWith("file:")) {
    return nextLoad(url, context);
  }

  return nextLoad(url, context);
}
