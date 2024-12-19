import { createThemesFromSpreadsheet } from "../src/data/createThemes.mjs";
import { writeJson } from "./file/writeJson.mjs";
import { resizeFolders } from "./resize/resizeFolders.mjs";

try {
  const resizedFolders = await resizeFolders();
  if (!resizedFolders) throw new Error("No resizedFolders");
  if (!resizedFolders["public"]) throw new Error("No resizedFolders.public");

  const themeData = await createThemesFromSpreadsheet(resizedFolders["public"]);

  // Write individual theme data files
  for (const [theme, data] of Object.entries(themeData)) {
    await writeJson(data, `src/data/themes/${theme}/theme.json`);
  }

  // Write complete themes data
  await writeJson(themeData, "src/data/themes.json");
  await writeJson(Object.keys(themeData), "src/data/themesKeys.json");

  console.log("Themes processed:", Object.keys(themeData).join("\n "));
} catch (e) {
  console.trace(e);
} finally {
  console.log("Done");
}
