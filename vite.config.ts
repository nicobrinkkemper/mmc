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
          // React vendor bundle including Canary and RSC
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-server-dom-esm")
          ) {
            return "react-vendor";
          }

          // Utils vendor bundle
          if (id.includes("node_modules")) {
            return "vendor";
          }

          // Static/computed data
          if (
            id.includes("src/data/themes.json") ||
            id.includes("src/data/themesKeys.json") ||
            id.includes("src/routes/")
          ) {
            return "data-vendor";
          }

          return null; // Let Vite handle other chunks
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
