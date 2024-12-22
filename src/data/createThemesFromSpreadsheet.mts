import { config } from "../config/config.js";
import { csvToThemeStaticData } from "./csvToThemeStaticData.js";
import { isValidTheme } from "./isValidTheme.js";

/**
 * In goes a structured format of all the images, out comes the data that will be saved to /src/data/themes.json
 */
export async function createThemesFromSpreadsheet(images: ThemeImages) {
  const SpreadsheetData = {} as Record<Theme, Record<string, unknown>>;
  for (let themeConfig of config) {
    const {
      googleSheet: { link },
      theme,
    } = themeConfig;
    try {
      if (theme in images === false) throw new Error(`No images for ${theme}}`);
      if (!isValidTheme(theme)) throw new Error(`Invalid theme ${theme}`);
      const response = await fetch(link);

      if (!response.ok) throw new Error("Response not ok");

      const csv = await response.text();

      if (typeof csv === "string") {
        const ThemeData = csvToThemeStaticData(themeConfig, csv, images);
        console.log(Object.keys(ThemeData));
        // throw new Error("test");
        Object.assign(SpreadsheetData, { [theme]: ThemeData });
      } else {
        console.warn(
          "No data from spreadsheet link, so theme.json will not be updated",
          csv
        );
      }
    } catch (e) {
      console.log(`Could not fetch spreadsheet for ${theme}`);
      throw e;
    }
  }
  return SpreadsheetData;
}
