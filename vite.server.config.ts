import { defineConfig } from "vite";
import { vitePluginReactServer } from "vite-plugin-react-server/server";
import { config } from "./vite.react.config.js";

export default defineConfig(() => {
  console.log("VITE CONFIG CALLED");
  return {
    plugins: [vitePluginReactServer(config)],
  };
});
