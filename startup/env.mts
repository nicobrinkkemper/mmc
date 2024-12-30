import { loadEnv } from "vite";
import { root } from "../server/constants.js";
const mode = process.env["NODE_ENV"] || "development";
const env = loadEnv(mode, root, "");

if (typeof env["VITE_BASE_URL"] !== "string")
  throw new Error("VITE_BASE_URL is not set");
if (typeof env["VITE_PUBLIC_URL"] !== "string")
  throw new Error("VITE_PUBLIC_URL is not set");

process.env["VITE_BASE_URL"] = env["VITE_BASE_URL"];
process.env["VITE_PUBLIC_URL"] = env["VITE_PUBLIC_URL"];
