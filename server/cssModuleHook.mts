import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import { env } from "./env.mjs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const isDevelopment = env["MODE"] === "development";

// Cache for processed CSS modules
const cssCache = new Map<
  string,
  {
    classNames: Record<string, string>;
    css: string;
  }
>();

const processCSS = async (
  source: string,
  filename: string,
  isModule: boolean
) => {
  const plugins = [];
  let classNames = {};

  if (isModule) {
    plugins.push(
      postcssModules({
        generateScopedName: isDevelopment
          ? "[name]__[local]"
          : "[hash:base64:8]",
        getJSON(cssFileName: string, json: Record<string, string>) {
          classNames = json;
        },
      })
    );
  }

  const result = await postcss(plugins).process(source, {
    from: filename,
    map: { inline: true },
  });

  return {
    css: result.css,
    classNames: isModule ? classNames : {},
  };
};

export async function resolve(
  specifier: string,
  context: any,
  nextResolve: any
) {
  if (!specifier.endsWith(".css")) {
    return nextResolve(specifier, context);
  }

  const resolved = await nextResolve(specifier, context);
  return {
    ...resolved,
    format: "module",
  };
}

export async function load(url: string, context: any, nextLoad: any) {
  if (!url.endsWith(".css")) {
    return nextLoad(url, context);
  }

  const isModule = url.endsWith(".module.css");
  const filePath = fileURLToPath(url);
  const source = readFileSync(filePath, "utf8");

  try {
    const { css, classNames } = await processCSS(source, filePath, isModule);
    cssCache.set(url, { css, classNames });

    // Generate valid ESM code that works with esm.sh imports
    const moduleCode = `
      import { createElement } from 'react';
      
      const styles = ${JSON.stringify(classNames)};
      const test = createElement('link', { href: 'data:text/css;base64,${Buffer.from(
        css
      ).toString("base64")}' });
      export default styles;
    `;

    return {
      format: "module",
      source: moduleCode,
      shortCircuit: true,
    };
  } catch (error) {
    console.error("Error processing CSS:", error);
    throw error;
  }
}
