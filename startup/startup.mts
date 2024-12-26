import { levelData } from "../src/data/levelData.js";
import { writeJson } from "./file/writeJson.mjs";
import { resizeFolders } from "./resize/resizeFolders.mjs";

try {
  const resizedFolders = await resizeFolders();

  await Promise.all([
    ...Object.entries(resizedFolders["public"]).map(async ([theme, images]) => {
      await writeJson(images, `src/data/themes/${theme}/images.json`);
    }),
    ...Object.entries(resizedFolders["src"]["assets"]).map(
      async ([theme, images]) => {
        await writeJson(images, `src/data/themes/${theme}/assets.json`);
      }
    ),
    ...(
      await levelData(resizedFolders["public"])
    ).map(async (batches) => {
      await writeJson(
        batches,
        `src/data/themes/${batches[0].pathInfo.theme}/${batches[0].pathInfo.theme}.json`
      );
      console.info(batches[0].pathInfo.theme);
    }),
  ]);
} catch (e) {
  console.trace(e);
} finally {
  console.log("Done");
}
