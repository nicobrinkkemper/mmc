import papa from "papaparse";
import _ from "lodash";
import type { CsvHeaders } from "./types.mjs";
import { safeSnakecase } from "../file/safeSnakecase.mjs";
import { Theme, themes } from "./themes.mjs";
import { ImageJsonStructure } from "../resize/resizeJobGroupToData.mjs";

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);

export async function fetchSpreadsheetToJson(
  link: string,
  images: Record<
    "7mmc" | "8mmc",
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
      jsonData[theme] = await new Promise((resolve) =>
        papa.parse(csv, {
          worker: true,
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transform: (val, header: CsvHeaders) => {
            if (header === "tags") return val.split(",").map((v) => v.trim());
            if (header === "releaseDate")
              return { date: val, formatted: formatDate(new Date(val)) };
            if (header === "levelName" || header === "makerName")
              return { name: val, slug: safeSnakecase(val) };
            return val;
          },
          complete: function ({
            data,
          }: Papa.ParseResult<{
            levelName: { slug: string };
            makerName: { slug: string };
            batchNumber: number;
            releaseDate: { date: string };
            tags: string[];
            image: string;
          }>) {
            const byBatch = _.groupBy(data, (row) => row.batchNumber);
            const batches = Object.entries(byBatch).map(
              ([batchNumber, levels]) => {
                return {
                  batchNumber,
                  releaseDate: levels[0].releaseDate,
                  levels: levels.map((level) => ({
                    ...level,
                    level: images[theme].level[level.levelName.slug],
                    levelThumbnail:
                      images[theme].level[level.levelName.slug + "_thumbnail"],
                    maker: images[theme].maker[level.makerName.slug],
                  })),
                };
              }
            );
            resolve({ key, batches, ...rest, ...images[theme].images });
          },
        })
      );
    } catch (e) {
      console.trace(e);
    }
  }
  return jsonData;
}
