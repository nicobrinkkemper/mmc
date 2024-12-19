import { groupBy } from "lodash-es";
function addImages({ maker: makerImages, level: levelImages, }) {
    return (levelData) => {
        const level = levelImages[levelData["levelName"]["slug"]];
        const maker = makerImages[levelData["makerName"]["slug"]];
        const levelThumbnail = levelImages[levelData["levelName"]["slug"] + "_thumbnail"];
        if (!level)
            return new Error("No level image at " + levelData["levelName"]["slug"]);
        if (!maker)
            return new Error("No maker image at " + levelData["makerName"]["slug"]);
        if (!levelThumbnail)
            return new Error("No level thumbnail image at " + levelData["levelName"]["slug"]);
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
function isNotError(v) {
    return !isError(v);
}
function isError(v) {
    return v instanceof Error;
}
function mapToBatches(images) {
    return ([batchNumber, levelData]) => {
        const releaseDate = levelData[0]["releaseDate"];
        if (!releaseDate)
            throw new Error("No releaseDate");
        const levelsAndErrors = levelData.map(addImages(images));
        const levels = levelsAndErrors.filter(isNotError);
        const errors = levelsAndErrors.filter(isError);
        const error = errors.length
            ? new Error(errors.map((e) => e.message).join("\n"))
            : null;
        if (error) {
            console.error(error);
        }
        // we wait until the end to throw the error so that we can see all the errors at once
        if (error)
            throw new Error("Error in addImages");
        if (!levels.length)
            throw new Error("No levels");
        return {
            batchNumber,
            releaseDate,
            levels,
        };
    };
}
function assertImages(i) {
    if (!i)
        throw new Error("images is undefined");
    if ("level" in i && !i?.level)
        throw new Error("level is undefined");
    if ("maker" in i && !i?.maker)
        throw new Error("maker is undefined");
    if ("images" in i && !i?.images)
        throw new Error("images is undefined");
}
export function csvToData(data, themeImages) {
    assertImages(themeImages);
    const { level, maker, images } = themeImages;
    const byBatch = groupBy(data, (row) => row["batchNumber"]);
    const batches = Object.entries(byBatch).map(mapToBatches({ level, maker }));
    return { batches, images };
}
//# sourceMappingURL=csvToData.mjs.map