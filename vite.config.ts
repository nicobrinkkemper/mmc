import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import themes from './src/data/themes.json' with { type: 'json' };
import themeKeys from './src/data/themesKeys.json' with { type: 'json' };

type Batch = (typeof themes)[keyof typeof themes]["batches"][number];
type Level = Batch["levels"][number];

export function getAllPaths(): string[] {
  const paths: string[] = [
    "" // the home page
  ];

  themeKeys.forEach((key: string) => {
    const theme = themes[key as keyof typeof themes];
    paths.push(key); // the theme page
    paths.push(`${key}/levels`); // the theme levels page
    paths.push(`${key}/credits`); // the theme credits page

    theme.batches?.forEach((batch: Batch) => {
      batch.levels?.forEach((level: Level) => {
        paths.push(`${key}/level/${batch.batchNumber}/${level.order}`); // the level page
      });
    });
  });

  return paths;
}

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
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "meta.json",
          source: JSON.stringify({
            static: getAllPaths(), // Add your static routes here
          }),
        });
      },
    },
  ],
  root: ".",
  build: {
    outDir: "build",
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        format: "es",
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["react-helmet-async", "react-error-boundary"],
          "utils-vendor": ["classnames", "lodash", "lodash-es"],
          "data-vendor": [
            "./src/data/themes.json",
            "./src/data/themesKeys.json",
          ],
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
