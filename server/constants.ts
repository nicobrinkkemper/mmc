import { resolve } from "node:path";

export const moduleBaseURL = "/dist/";
export const ssr_port = 3001;
export const rsc_port = 3002;
export const build = resolve("build");
export const assets = resolve(build, "assets");
export const root = resolve(".");
export const modules = resolve("dist/src");
export const node_modules = resolve("node_modules");
