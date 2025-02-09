import type { Config } from "postcss-load-config";

const config: Config = {
  plugins: {},
  from: "src/**/*.css",
  to: "dist/css/**/*.css",
};

export default config;
