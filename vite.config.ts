import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const ReactCompilerConfig = {
  sources: (filename: string) => filename.includes("src"),
};

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    {
      name: "generate-meta",
    },
  ],
  root: ".",
  build: {
    outDir: "build",
    target: "esnext",
    manifest: "manifest.json",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        format: "es",
        manualChunks: (id) => {
          // React and core dependencies
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-server-dom-esm") ||
            id.includes("node_modules/scheduler") || // Add scheduler
            id.includes("node_modules/use-sync-external-store") // Add use-sync-external-store
          ) {
            return "react-vendor";
          }

          // Router and React-dependent libraries
          if (id.includes("node_modules")) {
            return "node-modules";
          }
          // per-page data bundle
          if (id.includes("src/data")) {
            return id.replace("Page", "").toLocaleLowerCase();
          }

          // Static/computed data
          if (id.includes("src/data")) {
            return "data-vendor";
          }

          return null;
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
