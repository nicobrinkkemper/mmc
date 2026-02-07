import { defineConfig, type Plugin } from "vite";
import { vitePluginReactServer } from "vite-plugin-react-server";
import { config } from "./vite.react.config.js";

/**
 * Plugin to handle trailing slashes in preview mode.
 * Redirects /path to /path/ for directories to match static file structure.
 */
function trailingSlashPlugin(): Plugin {
  return {
    name: "trailing-slash",
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || "";
        // Skip if already has trailing slash, has extension, or is an asset
        if (
          url.endsWith("/") ||
          url.includes(".") ||
          url.startsWith("/@") ||
          url.startsWith("/__")
        ) {
          return next();
        }
        // Redirect to trailing slash version
        res.writeHead(301, { Location: url + "/" });
        res.end();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      trailingSlashPlugin(),
      ...(vitePluginReactServer(config) as Plugin[]),
    ],
  };
});
