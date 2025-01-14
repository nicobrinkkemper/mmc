import fs from "fs/promises";
import glob from "glob";
import path from "path";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import { safeSnakecase } from "../src/utils/safeSnakecase.js";

export async function processCssModules() {
  console.log("Processing CSS modules...");
  const cssFiles = glob.sync("src/**/*.module.css");
  console.log(`Found ${cssFiles.length} CSS modules`);

  for (const cssFile of cssFiles) {
    console.log(`Processing ${cssFile}...`);
    const css = await fs.readFile(cssFile, "utf-8");

    let classNames = {};
    const result = await postcss([
      postcssModules({
        getJSON(_, result) {
          classNames = result;
        },
      }),
    ]).process(css, { from: cssFile });

    console.log(`Found classes: ${Object.keys(classNames).join(", ")}`);

    const jsContent = Object.entries(classNames).map(([name, value]) => {
      return `export const ${safeSnakecase(name)} = "${value}";\n`;
    });
    // rawStyles
    jsContent.push(`export const css = \`${result.css}\`;`);

    const serverFile = path.join(
      process.cwd(),
      cssFile.replace(".css", ".css.server.ts")
    );

    await fs.mkdir(path.dirname(serverFile), { recursive: true });
    await fs.writeFile(serverFile, jsContent);
    console.log(`Created ${serverFile}`);
  }
}
