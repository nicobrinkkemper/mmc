import { createThemesFromSpreadsheet } from "../src/data/createThemesFromSpreadsheet.mjs";
import { writeJson } from "./file/writeJson.mjs";
import { resizeFolders } from "./resize/resizeFolders.mjs";

try {
  const resizedFolders = await resizeFolders();
  if (!resizedFolders) throw new Error("No resizedFolders");
  if (!resizedFolders["public"]) throw new Error("No resizedFolders.public");

  const themeData = await createThemesFromSpreadsheet(resizedFolders["public"]);

  // Write individual theme data files
  for (const [key, data] of Object.entries(themeData)) {
    await writeJson(data, `src/data/themes/${key}/${key}.json`);
  }

  // Write complete themes data
  await writeJson(themeData, "src/data/themes.json");

  console.log("Themes processed:", Object.keys(themeData).join("\n "));
} catch (e) {
  console.trace(e);
} finally {
  console.log("Done");
}
