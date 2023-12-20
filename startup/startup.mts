import { resizeFolders } from "./resize/resizeImages.mjs";
import { resizeJobs } from "./resizeJobs.mjs";
import { fetchSpreadsheetToJson } from "./data/fetchSpreadsheetToJson.mjs";
import { writeJson } from "./file/writeJson.mjs";

/**
 * Throw any image into the "resizeImages" folder at the corresponding folder you want it to resize to.
 * Info from both spreadsheet and images will be combined into a single json file in a convenient format.
 */
try {
  const resizedFolders = await resizeFolders({
    resizeJobs,
    inputPath: "./resizeImages",
    outputDir: "./",
  });
  if (!resizedFolders) throw new Error("No resizedFolders");

  console.log("Resized folders\n", Object.keys(resizedFolders).join("\n "));

  const json = await fetchSpreadsheetToJson(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub",
    resizedFolders.public
  );

  await writeJson(json, "src/data/themes.json");
  console.log("", Object.keys(json).join("\n "));
} catch (e) {
  console.trace(e);
} finally {
  console.log("Done");
}
