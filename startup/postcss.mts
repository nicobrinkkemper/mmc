import { globSync } from "fs";
import fs from "fs/promises";
import path from "path";
import postcss from "postcss";
import postcssModules from "postcss-modules";

// deprecated, can be used to generate css modules for typescript, but we use the css-modules plugin for typescript
export async function processCssModules() {
  console.log("Processing CSS modules...");
  const cssFiles = globSync("src/**/*.module.css");
  console.log(`Found ${cssFiles.length} CSS modules`);

  for (const cssFile of cssFiles) {
    const css = await fs.readFile(cssFile, "utf-8");

    let classNames = {};
    const result = await postcss([
      postcssModules({
        getJSON(_, result) {
          classNames = result;
        },
      }),
    ]).process(css, { from: cssFile });

    // rawStyles
    const jsContent = `export default ${JSON.stringify(classNames)};`;

    const serverFile = path.join(
      process.cwd() + '/dist/css-modules',
      cssFile.replace(".css", ".css.server.ts")
    );

    await fs.mkdir(path.dirname(serverFile), { recursive: true });
    await fs.writeFile(serverFile, jsContent);
  }
}

