import { defineConfig } from "vite";

export default defineConfig(() => {
  console.log("VITE CONFIG CALLED");
  return {
    build: {
      target: "es2020",
      ssr: false,
      outDir: "dist/client",
      manifest: true,
    },
  };
});
