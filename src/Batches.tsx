import "./Batches.css";
import React from "react";
import Card from "./Card";
import { useLevelData, releaseDays } from "./useLevelData";
import Seo from "./Seo";
import { DEFAULT_TITLE } from "./constants";
import formatDate from "./formatBatchName";

function Batches() {
  const levelData = useLevelData();
  return (
    <div className="Batches">
      {releaseDays.map((releaseDay, i) => {
        const classes = ["BatchCard"];
        const isNew = levelData.newestBatch === i;
        const isUnreleased =
          levelData.releasedBatches.indexOf(releaseDay) === -1;
        const isFinalWeek = releaseDays.indexOf(releaseDay) === releaseDays.length - 1;
        if (isNew) classes.push("isNew");
        if (isUnreleased) classes.push("isUnreleased");
        if (isFinalWeek) classes.push("isFinal");
        return (
          <Card key={String(i)} disabled={isUnreleased} to={`/levels/${i + 1}`}>
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
                {isFinalWeek ? (
                  <span className="final">Lost Levels</span>
                ) : null}
              </div>
            </div>
          </Card>
        );
      })}
      <Seo
        description={`Week overview of ${DEFAULT_TITLE}. ${levelData.releasedBatches.length} weeks released so far!`}
        title={`${DEFAULT_TITLE} | Week overview`}
      />
    </div>
  );
}
export { Batches };
export default Batches;
