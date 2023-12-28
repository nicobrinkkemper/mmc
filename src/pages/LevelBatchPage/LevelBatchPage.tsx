import { Batch } from "./Batch";
import { Layout } from "../../layout/Layout";
import { useTheme } from "../../theme/useTheme";
import { useBatch } from "../../theme/useBatch";
import { convertNumberToWord } from "../../theme/convertNumberToWord";
import { WeekTrailer } from "./WeekTrailer/WeekTrailer";


const humanReadableArray = <ARR extends readonly string[]>(a: ARR): string => {
    if (a.length === 1) return a[0];
    return [a.slice(0, a.length - 1).join(", "), a[a.length - 1]].join(" and ");
};

export function LevelBatchPage() {
    const { info: { caps, writtenOut } } = useTheme();
    const { batchNumber, batch: { levels, releaseDate } } = useBatch();
    return <Layout type="simple" small seo={{
        description: `Week ${batchNumber} of ${caps} has started! In this week's trailer we show off ${convertNumberToWord(levels.length)} new levels: ${humanReadableArray(levels.map(({ levelName: { name } }) => name))}. Celebrating ${writtenOut}! Week ${batchNumber} released at ${releaseDate.formatted}.`,
        title: `${caps} | Week overview`
    }}
    >
        <WeekTrailer />
        <Batch />
    </Layout >
};