import { loadEnv } from "vite";

export const env = loadEnv("development.local", process.cwd(), ["VITE_"]);
