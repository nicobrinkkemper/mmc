import _ from "lodash";
import { Images, ThemeCsvParseResultData } from "./types.mjs";
import { Theme } from "./themes.mjs";

function addImages({ maker, level }: Omit<Images[Theme], "images">) {
  return (levelData: _.Dictionary<ThemeCsvParseResultData>) => ({
    ...levelData,
    images: {
      level: level[levelData.levelName.slug],
      levelThumbnail: level[levelData.levelName.slug + "_thumbnail"],
      maker: maker[levelData.makerName.slug],
    },
  });
}

function mapToBatches(images: Omit<Images[Theme], "images">) {
  return ([batchNumber, levels]: [
    string,
    _.Dictionary<ThemeCsvParseResultData>[],
  ]) => {
    return {
      batchNumber,
      releaseDate: levels[0].releaseDate,
      levels: levels.map(addImages(images)),
    };
  };
}

export function csvToData(
  data: ThemeCsvParseResultData[],
  { level, maker, images }: Images[Theme]
) {
  const byBatch = _.groupBy(data, (row) => row.batchNumber);
  const batches = Object.entries(byBatch).map(mapToBatches({ level, maker }));
  return { batches, images };
}
