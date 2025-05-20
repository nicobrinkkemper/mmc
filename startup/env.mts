import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let mode = "";
try {
  mode = process.env["NODE_ENV"] || "production";
} catch (e) {
  try {
    // @ts-ignore
    mode = import.meta.env.MODE || "production";
  } catch (e) {
    console.error("Error loading env:", e);
  }
}
export const env = loadEnv(mode, root, "");
