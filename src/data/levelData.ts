import { themeConfig as allThemeConfig } from "../config/themeConfig.js";
import { batchProcessor } from "./batchProcessor.js";
import { csvParse } from "./csvParse.js";
import { csvThemeMapper } from "./csvThemeMapper.js";

/**
 * In goes a structured format of all the images, out comes the data that will be saved to /src/data/themes.json
 */
export const levelData = async (images: ResizeImageStructure["public"]) =>
  Promise.all(
    allThemeConfig.map(async (themeConfig) => {
      const csv = await themeConfig.fetchCsv();
      const themeData = csvParse(
        csv,
        {
          skipHeaders: true,
          rowMode: true,
        },
        csvThemeMapper
      ).map((level) => {
        return {
          ...level,
          pathInfo:
            typeof level.pathInfo === "function"
              ? level.pathInfo({ theme: themeConfig.theme })
              : level.pathInfo,
          images:
            typeof level.images === "function"
              ? level.images(images[themeConfig.theme])
              : level.images,
        };
      });
      return batchProcessor(themeConfig, themeData);
    })
  );
