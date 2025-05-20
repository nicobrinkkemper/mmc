import { defineConfig } from "vite";
import { vitePluginReactServer } from "vite-plugin-react-server";
import { config } from "./vite.react.config.js";

export default defineConfig(() => {
  return {
    plugins: vitePluginReactServer(config),
  };
});
