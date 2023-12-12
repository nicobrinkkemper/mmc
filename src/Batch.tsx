import "./Batch.css";
import Card from "./Card";
import { useLevelData } from "./useLevelData";
import { useParams } from "react-router-dom";
import { lowerCase, snakeCase } from "lodash";
import Seo from "./Seo";
import { humanReadableArray } from "./humanReadableArray";
import { LevelImage } from "./LevelImage";
import { useTheme } from "./theme/useTheme";
import { convertNumberToWord } from "./theme/convertNumberToWord";
import { Difficulty } from "./Difficulty";

const Batch = () => {
  const { batchNumber } = useParams<Record<"batchNumber", string>>();
  const { themeSlug, info: { caps, writtenOut } } = useTheme();
  const { newestBatch, releaseDays, releasedBatches, levels } = useLevelData();
  const releaseDay = releaseDays[Number(batchNumber) - 1];
  const classes = ["Batch"];
  const isNew = newestBatch === Number(batchNumber) - 1;
  const batchLevels = levels(Number(batchNumber));
  const isUnreleased = releasedBatches.indexOf(releaseDay) === -1;
  if (isNew) classes.push("isNew");
  if (isUnreleased) return <span>
    <h1>You have found a secret page!</h1>
    <p>However, there's no week {batchNumber} for this event.</p>
  </span>;
  const levelNames = humanReadableArray(batchLevels.map(({ levelName }) => levelName));
  return (
    <div>
      <h1>
        {new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
        }).format(releaseDay)}
      </h1>
      <div className={classes.join(' ')}>

        {batchLevels.map((level, i) => {
          const tags = level.tags.split(",");
          const to = `${themeSlug}level/${batchNumber}/${level.order}/`
          return (
            <Card key={to} to={to}>
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
                      {(tags?.find(v => !!v) ? tags : [level.genre || 'bonus']).map((tag) => (
                        <span className={`tag ${snakeCase(tag)}`} key={`${level.batchIndex}${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Difficulty level={level} />
                  </div>
                </div>
              </div>
              <Seo
                description={`Week ${batchNumber} of ${caps} has started! In this week's trailer we show off ${convertNumberToWord(batchLevels.length)} new levels: ${levelNames}. Celebrating ${writtenOut}! Week ${batchNumber} released at ${releaseDay.toDateString()}.`}
                title={`${caps} | Week ${batchNumber}`}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export { Batch };
export default Batch;
