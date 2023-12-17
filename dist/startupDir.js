import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
export const startupDir = dirname(fileURLToPath(import.meta.url));
