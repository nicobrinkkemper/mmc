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
          if (id.includes("node_modules")) {
            if (id.includes("react")) return null;
            return "deps";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
    commonjsOptions: {
      include: [/node_modules/],
      exclude: [/esm\.sh/],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "use-sync-external-store/shim/with-selector":
        "use-sync-external-store/shim/with-selector.js",
      react: "https://esm.sh/react@19.0.0-beta-26f2496093-20240514",
      "react-dom": "https://esm.sh/react-dom@19.0.0-beta-26f2496093-20240514",
      "react-dom/client":
        "https://esm.sh/react-dom@19.0.0-beta-26f2496093-20240514/client",
      "react/jsx-runtime":
        "https://esm.sh/react@19.0.0-beta-26f2496093-20240514/jsx-runtime",
      "@jsxImportSource":
        "https://esm.sh/react@19.0.0-beta-26f2496093-20240514",
    },
    preserveSymlinks: true,
  },
});
