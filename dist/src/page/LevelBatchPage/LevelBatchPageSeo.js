import { convertNumberToWord } from "../../data/convertNumberToWord.js";
const humanReadableArray = (a) => {
    if (a.length === 1)
        return a[0];
    return [a.slice(0, a.length - 1).join(", "), a[a.length - 1]].join(" and ");
};
export const LevelBatchPageSeo = ({ batchNumber, writtenOut, caps, levels, releaseDate, }) => ({
    description: `Week ${batchNumber} of ${caps} has started! In this week's trailer we show off ${convertNumberToWord(levels.length)} new levels: ${humanReadableArray(levels.map(({ levelName: { name } }) => name))}. Celebrating ${writtenOut}! Week ${batchNumber} released at ${releaseDate.formatted}.`,
    title: `${caps} | Week overview`,
});
//# sourceMappingURL=LevelBatchPageSeo.js.map