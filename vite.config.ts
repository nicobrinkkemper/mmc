import { defineConfig } from "vite";
import { vitePluginReactServer } from "vite-plugin-react-server";
import { config } from "./vite.react-stream.js";

export default defineConfig(() => {
  console.log("VITE CONFIG CALLED");
  return {
    plugins: [vitePluginReactServer(config)],
    manifest: true,
    build: {
      rollupOptions: {
        input: {
          "src/components/Clickable.client":
            "/src/components/Clickable.client.tsx",
        },
      },
    },
  };
});
