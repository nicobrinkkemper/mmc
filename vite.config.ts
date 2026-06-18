import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginReactServer } from "vite-plugin-react-server";
import { inlineFlightPayload } from "vite-plugin-react-server/react-static/inlineFlightPayload";
import { config } from "./vite.react.config.js";

/**
 * After vprs prerenders the site, inline each route's flight payload into its
 * own HTML (a non-executable <script id="vprs-flight">) so the browser has the
 * initial RSC payload at load. createReactFetcher consumes it on the first call
 * instead of fetching index.rsc, which lets the client decode + hydrate in place
 * with no network round-trip and no flash. Client navigations still fetch their
 * target route's .rsc as before. staticDir matches the deploy artifact
 * (scripts/deploy-ftp.mjs uploads dist/static).
 */
function inlineFlightPlugin(): Plugin {
  return {
    name: "mmc:inline-flight-payload",
    async closeBundle() {
      const count = await inlineFlightPayload({
        staticDir: resolve("dist/static"),
      });
      console.log(`[mmc] inlined flight payload into ${count} page(s)`);
    },
  };
}

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
    base: process.env.BASE_URL || "/",
    plugins: [
      // `react()` before vitePluginReactServer(): client-component Fast Refresh
      // (state-preserving hot updates); vprs owns server-component HMR.
      react(),
      trailingSlashPlugin(),
      ...(vitePluginReactServer(config) as Plugin[]),
      // After vprs (closeBundle runs post-build, once static files exist).
      inlineFlightPlugin(),
    ],
  };
});
