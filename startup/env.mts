import { env as DevelopmentEnv } from "./env.development.mjs";
import { env as GithubEnv } from "./env.gh.mjs";
import { env as ProductionEnv } from "./env.production.mjs";

export const env = process.env["GITHUB_ACTIONS"]
  ? GithubEnv
  : process.env["NODE_ENV"] === "production"
  ? ProductionEnv
  : DevelopmentEnv;

process.env["VITE_BASE_URL"] = env.VITE_BASE_URL;
process.env["VITE_PUBLIC_ORIGIN"] = env.VITE_PUBLIC_ORIGIN;
process.env["VITE_NODE_ENV"] = env.VITE_NODE_ENV;
process.env["VITE_DEV"] = env.VITE_DEV.toString();
process.env["VITE_PROD"] = env.VITE_PROD.toString();
process.env["GITHUB_ACTIONS"] = "false";
