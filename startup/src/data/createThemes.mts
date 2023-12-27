import papa from "papaparse";
import type { ThemeCsvParseResult, ThemeCsvParseResultData } from "./types.mjs";
import { Theme, themes } from "./themes.mjs";
import { ImageJsonStructure } from "../resize/resizeJobGroupToData.mjs";
import { transformCsv } from "./transformCsv.mjs";
import { csvToData } from "./csvToData.mjs";
import { spreadsheetLink } from "../spreadsheetLink.mjs";

type SpreadsheetDataType = Record<Theme, Record<string, unknown>>;

/**
 * In goes a structured format of all the images, out comes the data that will be saved to /src/data/themes.json
 */
export async function createThemes(
  images: Record<
    Theme,
    Record<"level" | "maker" | "images", ImageJsonStructure>
  >
) {
  const SpreadsheetData = {} as SpreadsheetDataType;
  for (let { gid, key, theme, ...rest } of themes) {
    try {
      if (theme in images === false)
        throw new Error(`No images for ${theme}, ${Object.keys(images)}`);

      const response = await fetch(spreadsheetLink(gid));

      if (!response.ok) throw new Error("Response not ok");

      const csv = await response.text();

      const { data } = await new Promise<ThemeCsvParseResult>(
        (resolve, reject) =>
          papa.parse<ThemeCsvParseResultData>(csv, {
            worker: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transform: transformCsv,
            complete: resolve,
            error: reject,
          })
      );
      const ThemeData = csvToData(data, images[theme]);
      SpreadsheetData[theme] = {
        key,
        ...rest,
        ...ThemeData,
      };
    } catch (e) {
      console.log(`Could not fetch spreadsheet for ${theme}`);
      console.trace(e);
    }
  }
  return SpreadsheetData;
}
