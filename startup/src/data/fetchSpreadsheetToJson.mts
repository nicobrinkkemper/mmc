import papa from "papaparse";
import type { ThemeCsvParseResult, ThemeCsvParseResultData } from "./types.mjs";
import { Theme, themes } from "./themes.mjs";
import { ImageJsonStructure } from "../resize/resizeJobGroupToData.mjs";
import { transformCsv } from "./transformCsv.mjs";
import { csvToData } from "./csvToData.mjs";

export async function fetchSpreadsheetToJson(
  link: string,
  images: Record<
    Theme,
    Record<"level" | "maker" | "images", ImageJsonStructure>
  >
) {
  const jsonData = {} as Record<Theme, Record<string, unknown>>;
  for (let { gid, key, theme, ...rest } of themes) {
    try {
      const response = await fetch(`${link}?gid=${gid}&single=true&output=csv`);

      if (!response.ok)
        throw new Error(`unexpected response ${response.statusText}`);
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
      const themeData = csvToData(data, images[theme]);
      jsonData[theme] = {
        key,
        ...rest,
        ...themeData,
      };
    } catch (e) {
      console.trace(e);
    }
  }
  return jsonData;
}
