import _ from "lodash";
import { Theme } from "./themes.mjs";
import { Images, ThemeCsvParseResultData } from "./types.mjs";

function addImages({
  maker: makerImages,
  level: levelImages,
}: Omit<Images[Theme], "images">) {
  return (levelData: _.Dictionary<ThemeCsvParseResultData>) => {
    const level = levelImages[levelData.levelName.slug];
    const maker = makerImages[levelData.makerName.slug];
    const levelThumbnail = levelImages[levelData.levelName.slug + "_thumbnail"];
    if (!level)
      return new Error("No level image at " + levelData.levelName.slug);
    if (!maker)
      return new Error("No maker image at " + levelData.makerName.slug);
    if (!levelThumbnail)
      return new Error(
        "No level thumbnail image at " + levelData.levelName.slug
      );
    return {
      ...levelData,
      images: {
        level,
        levelThumbnail,
        maker,
      },
    };
  };
}
function isNotError<V>(v: V | Error): v is Exclude<V, Error> {
  return !isError(v);
}

function isError<V>(v: V | Error): v is Error {
  return v instanceof Error;
}

function mapToBatches(images: Omit<Images[Theme], "images">) {
  return ([batchNumber, levelData]: [
    string,
    _.Dictionary<ThemeCsvParseResultData>[],
  ]) => {
    const releaseDate = levelData[0].releaseDate;
    if (!releaseDate) throw new Error("No releaseDate");
    const levelsAndErrors = levelData.map(addImages(images));
    const levels = levelsAndErrors.filter(isNotError);
    const errors = levelsAndErrors.filter(isError);
    const error = errors.length
      ? new Error(errors.map((e) => e.message).join("\n"))
      : null;
    if (error) {
      console.log(error);
    }

    // we wait until the end to throw the error so that we can see all the errors at once
    if (error) throw new Error("Error in addImages");
    if (!levels.length) throw new Error("No levels");
    return {
      batchNumber,
      releaseDate,
      levels,
    };
  };
}

function assertImages(i: any): asserts i is Images[Theme] {
  if (!i) throw new Error("images is undefined");
  if ("level" in i && !i?.level) throw new Error("level is undefined");
  if ("maker" in i && !i?.maker) throw new Error("maker is undefined");
  if ("images" in i && !i?.images) throw new Error("images is undefined");
}

export function csvToData(
  data: ThemeCsvParseResultData[],
  themeImages?: Images[Theme]
) {
  assertImages(themeImages);
  const { level, maker, images } = themeImages;
  const byBatch = _.groupBy(data, (row) => row.batchNumber);
  const batches = Object.entries(byBatch).map(mapToBatches({ level, maker }));
  return { batches, images };
}
