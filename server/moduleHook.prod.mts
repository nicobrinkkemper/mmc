import fs from "node:fs";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import { getSource } from "./module-loader/getSource.mjs";
import { resolve } from "./module-loader/resolve.mjs";
import { transformSource } from "./module-loader/transformSource.mjs";

/**
 * Production load function that ensures source is a string
 */
export async function load(
  url: string,
  context: LoadContext,
  defaultLoad: LoadFunction
): Promise<{ format: string; shortCircuit?: boolean; source: Source }> {
  if (url.endsWith(".module.css")) {
    const urlPath = new URL(url).pathname;
    const css = fs.readFileSync(urlPath, "utf-8");
    let json = {};

    await postcss([
      postcssModules({
        getJSON(_, output) {
          json = output;
        },
      }),
    ]).process(css, { from: urlPath });

    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${JSON.stringify(json)};`,
    };
  }

  // Handle react-dom/server
  if (url.includes("react-dom/server")) {
    return {
      format: "module",
      shortCircuit: true,
      source: `
        import { createRequire } from 'node:module';
        const require = createRequire(import.meta.url);
        const { renderToPipeableStream } = require('react-dom/server');
        export { renderToPipeableStream };
      `,
    };
  }

  const result = await defaultLoad(url, context, defaultLoad);
  console.log("[PROD] Loading:", url);

  if (result.format === "module") {
    if (result.source && typeof result.source !== "string") {
      console.log("[PROD] Converting source to string for:", url);
      result.source = Buffer.from(result.source as ArrayBuffer).toString();
    }
    return { format: "module", source: result.source };
  }
  return result;
}

export { getSource, resolve, transformSource };
