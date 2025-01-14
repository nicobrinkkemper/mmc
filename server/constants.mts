/// <reference types="vite/client" />

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL_WITH_PUBLIC_URL } from "../src/config/constants.js";
import { env } from "./env.mjs";

const __dirname = fileURLToPath(
  new URL(".", import.meta.url /* @vite-ignore */)
);

export const rsc_port = parseInt(env["VITE_RSC_PORT"] || "3003");
export const ssr_port = parseInt(env["VITE_SSR_PORT"] || "3001");
export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const build = resolve(root, "../build");
export const node_modules = resolve(root, "../node_modules");
export const moduleBase = "src";
export const moduleBasePath = `${moduleBase}/`;
export const moduleRootPath = resolve(root, moduleBase);
export const moduleBaseURL = `${BASE_URL_WITH_PUBLIC_URL}:${rsc_port}${moduleBasePath}`;
export const assets = resolve(build, "assets");
export const prebuildModules = resolve(build, "assets/src");

export const levels = "levels";
export const level = "level";

// Read and parse manifest.json
export const manifestPath = resolve(build, "manifest.json");
