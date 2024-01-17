import { createThemes } from "./data/createThemes.mjs";
import { writeJson } from "./file/writeJson.mjs";
import { resizeFolders } from "./resize/resizeFolders.mjs";

/**
 * Throw any image into the "resizeImages" folder at the corresponding folder you want it to resize to.
 * Info from both spreadsheet and images will be combined into a single json file in a convenient format.
 */
try {
  const resizedFolders = await resizeFolders();
  if (!resizedFolders) throw new Error("No resizedFolders");

  console.log("Resized folders\n", Object.keys(resizedFolders).join("\n "));
  if (!resizedFolders.public) throw new Error("No resizedFolders.public");
  const json = await createThemes(resizedFolders.public);

  await writeJson(json, "src/data/themes.json");
  const keys = Object.keys(json) as (keyof typeof json)[];
  await writeJson(keys, "src/data/themesKeys.json");
  console.log("", keys.join("\n "));
} catch (e) {
  console.trace(e);
} finally {
  console.log("Done");
}
