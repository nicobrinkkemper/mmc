import "./Batch.css";
import Card from "Card";
import { useLevelData, releaseDays } from "useLevelData";
import { useParams } from "react-router-dom";
import { lowerCase, snakeCase } from "lodash";
import Stars from "./Stars";
import Seo from "./Seo";
import { DEFAULT_TITLE } from "./constants";
import { humanReadableArray } from "./humanReadableArray";
import { LevelImage } from "LevelImage";
const Batch = () => {
  const { batchNumber } = useParams<Record<"batchNumber", string>>();
  const releaseDay = releaseDays[Number(batchNumber) - 1];
  const { newestBatch, releasedBatches, levels } = useLevelData();
  const classes = ["Batch"];
  const isNew = newestBatch === Number(batchNumber) - 1;
  const batchLevels = levels(Number(batchNumber));
  const isUnreleased = releasedBatches.indexOf(releaseDay) === -1;
  if (isNew) classes.push("isNew");
  if (isUnreleased) return <span>...</span>;
  const levelNames = humanReadableArray(batchLevels.map(({ levelName }) => levelName));
  return (
    <>
      <div className={classes.join(' ')}>
        <h1>
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
          }).format(releaseDay)}
        </h1>
        {batchLevels.map((level, i) => {
          const tags = level.tags.split(",");
          return (
            <Card key={String(i)} to={`/level/${batchNumber}/${level.order}/`}>
              <div className={"LevelCard"}>
                <LevelImage levelName={level.levelName} />
                <div className="info">
                  <div className="makerInfo">
                    <span className={"levelName"}>{level.levelName}</span>
                    <div className={"makerName"}>
                      <span
                        className={`nationality flag-icon flag-icon-${lowerCase(
                          level.nationality
                        )}`}
                      />
                      <span className="name">{level.makerName}</span>
                    </div>
                  </div>
                  <div className="levelInfo">
                    <div className={"tags"}>
                      {tags.map((tag, i) => (
                        <span className={`tag ${snakeCase(tag)}`} key={`${level.batchIndex}${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`difficulty`}>
                      <span>Difficulty: </span>
                      <span className={`stars stars-${level.difficulty}`}>
                        <Stars value={level.difficulty} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Seo
                description={`Week ${batchNumber} of 7MMC has started! In this week's trailer we show off eight new levels: ${levelNames}. Celebrating Seven years of Mario Maker! Week ${batchNumber} released at ${releaseDay.toDateString()}.`}
                title={`${DEFAULT_TITLE} | Week ${batchNumber}`}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};
export { Batch };
export default Batch;
