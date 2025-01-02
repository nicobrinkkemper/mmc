import fs from "fs";
import { loadEnv } from "vite";
import { root } from "../server/constants.js";
const mode = process.env["NODE_ENV"] || "development";
const env = loadEnv(mode, root, "");

if (
  typeof env["VITE_BASE_URL"] !== "string" ||
  typeof env["VITE_PUBLIC_URL"] !== "string"
) {
  // write the env file
  console.log("Writing env file");
  fs.writeFileSync(
    ".env.development.local",
    "VITE_BASE_URL='http://localhost:3000'\nVITE_PUBLIC_URL=''"
  );
  process.env["VITE_BASE_URL"] = "http://localhost:3000";
  process.env["VITE_PUBLIC_URL"] = "";
} else {
  console.log("Using env file");
  process.env["VITE_BASE_URL"] = env["VITE_BASE_URL"];
  process.env["VITE_PUBLIC_URL"] = env["VITE_PUBLIC_URL"];
}
