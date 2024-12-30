import "./env.mjs";
//
import {
  generatedFolder,
  themeConfig,
  themes,
} from "../src/config/themeConfig.js";
import { levelData } from "../src/data/levelData.js";
import { writeFile } from "./file/writeFile.mjs";
import { writeJson } from "./file/writeJson.mjs";
import { resizeFolders } from "./resize/resizeFolders.mjs";

const generateJsonBarrel = (entries: string[], fileName: string) =>
  entries
    .map(
      (theme) =>
        `export {default as _${theme}} from "./${theme}/${fileName}.json" with { type: "json" };`
    )
    .join("\n");

const writeThemeJson = async (theme: string, images: any, fileName: string) =>
  await writeJson(images, `${generatedFolder}/${theme}/${fileName}.json`);

const processThemeData = async (
  themeConfig: ThemeConfig<Theme>,
  resizedPublic: ResizeImageStructure["public"]
) => {
  const csv = await themeConfig.fetchCsv();
  return {
    ...levelData(themeConfig, resizedPublic[themeConfig.theme], csv),
    images: resizedPublic[themeConfig.theme]["images"],
  };
};

const main = async () => {
  try {
    const resizedFolders = await resizeFolders();
    const {
      public: publicFolders,
      src: { assets: assetFolders },
    } = resizedFolders;

    await Promise.all([
      // Process theme data
      Promise.all(
        themeConfig.map(async (config) => {
          // important bit
          const data = await processThemeData(config, publicFolders);
          await writeJson(
            data,
            `${generatedFolder}/${config.theme}/themes.json`
          );
          return [config.theme, data];
        })
      ).then(() =>
        writeFile(
          generateJsonBarrel(themes, "themes"),
          `${generatedFolder}/themes.ts`
        )
      ),
      // Handle public images
      Promise.all(
        Object.entries(publicFolders).map(([theme, images]) =>
          writeThemeJson(theme, images, "images")
        )
      ).then(() =>
        writeFile(
          generateJsonBarrel(Object.keys(publicFolders), "images"),
          `${generatedFolder}/images.ts`
        )
      ),
      // Handle assets
      Promise.all(
        Object.entries(assetFolders).map(([theme, images]) =>
          writeThemeJson(theme, images, "assets")
        )
      ).then(() =>
        writeFile(
          generateJsonBarrel(Object.keys(assetFolders), "assets"),
          `${generatedFolder}/assets.ts`
        )
      ),
    ]);
  } catch (e) {
    console.trace(e);
  } finally {
    console.log("Done");
  }
};

main();
