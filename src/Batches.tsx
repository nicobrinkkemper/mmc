import "./Batches.css";
import Card from "./Card";
import { useLevelData } from "./useLevelData";
import Seo from "./Seo";
import formatDate from "./formatBatchName";
import { useTheme } from "./theme/useTheme";

function Batches() {
  const levelData = useLevelData();
  const { themeSlug, info: { caps } } = useTheme();
  return (
    <div className="Batches">
      {levelData.releaseDays.map((releaseDay, i) => {
        const classes = ["BatchCard"];
        const isNew = levelData.newestBatch === i;
        const isUnreleased =
          levelData.releasedBatches.indexOf(releaseDay) === -1;
        const isFinalWeek = levelData.releaseDays.indexOf(releaseDay) === 5;
        if (isNew) classes.push("isNew");
        if (isUnreleased) classes.push("isUnreleased");
        if (isFinalWeek) classes.push("isFinal");
        return (
          <Card key={releaseDay.toISOString()} disabled={isUnreleased} to={`/${themeSlug}levels/${i + 1}/`}>
            <div className={classes.join(" ")}>
              <span className="batchNumber">{i + 1}</span>
              <div className="releaseInfo">
                <span className="releaseDay">{formatDate(releaseDay)}</span>
                <span className="batchLevelAmount">
                  {isUnreleased ? 8 : levelData.batch(i + 1).length} levels
                </span>
              </div>
              <div className="tags">
                {isNew ? <span className="new">New</span> : null}
                {isUnreleased ? (
                  <span className="unreleased">Unreleased</span>
                ) : null}
                {isFinalWeek && !isUnreleased ? (
                  <span className="final">Finale</span>
                ) : null}
              </div>
            </div>
          </Card>
        );
      })}
      <Seo
        description={`Week overview of ${caps}. ${levelData.releasedBatches.length} weeks released so far!`}
        title={`${caps} | Week overview`}
      />
    </div>
  );
}
export { Batches };
