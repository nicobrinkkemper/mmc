import "./Level.css";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { useLevelData, releaseDays } from "./useLevelData";
import { Stars } from "./Stars";
import { Button } from "./Button";
import { levelPath } from "./levelPath";
import Seo from "./Seo";
import { DEFAULT_TITLE } from "./constants";
import { parseMarkdown } from "./runtimeMarkdown";
import { LevelImage } from "LevelImage";
import { MakerImage } from "MakerImage";

const Level = () => {
  const { batchNumber: strBatchNumber, order: strOrder } =
    useParams<Record<"batchNumber" | "order", string>>();
  const order = Number(strOrder);
  const levelData = useLevelData();
  const batchLevels = levelData.levels(Number(strBatchNumber));
  const level = batchLevels.find(({ order: _order }) => _order === order);
  
  if (typeof level !== "object") return <span>There is nothing here. Please come back later.</span>;
  const startOrder = batchLevels[0].order;
  const endOrder = batchLevels[batchLevels.length - 1].order;
  const batchNumber = Number(level.batchNumber);
  if (Number(strBatchNumber) !== level.batchNumber)
    return <span>A problem occurred. Please come back later.</span>;
  const releaseDay = releaseDays[batchNumber - 1];
  const classes = ["Level"];
  const isNew = levelData.newestBatch === batchNumber - 1;
  const isUnreleased = levelData.releasedBatches.indexOf(releaseDay) === -1;

  const tags = level.tags.split(",");
  const hasPreviousLevel = Number(order) > startOrder;
  const hasNextLevel = endOrder > Number(order);
  const navigationClasses = ["navigation"];
  if (hasPreviousLevel) navigationClasses.push("hasPreviousLevel");
  if (hasNextLevel) navigationClasses.push("hasNextLevel");
  if (isNew) classes.push("isNew");
  if (isUnreleased) return <span>This level hasn't been released yet.</span>;
  
  return (
    <div className="Level">
      <Card>
        <div className="levelCard">
          <div className="info">
            <div className="makerInfo">
              <span className={"levelName"}>{level.levelName}</span>
            </div>
            <LevelImage levelName={level.levelName} />
            <div className="levelCode">
              {level.levelCode || "Code coming soon"}
            </div>
            <div className="levelInfo">
              <div className={"tags"}>
                {tags.map((tag, i) => (
                  <span className="tag" key={i.toString()}>
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
            <div className="description">{parseMarkdown(level.description)}</div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="makerCard">
          <div className="info">
            <MakerImage makerName={level.makerName} />
            <div className={"makerName"}>
              <span
                className={`nationality flag-icon flag-icon-${level.nationality.toLowerCase()}`}
              />
              <span className="name">{level.makerName}</span>
              <span className="makerId">{level.makerId}</span>
            </div>
            <div className="makerDescription" style={{ whiteSpace: "pre-line" }}>
              {parseMarkdown(level.makerDescription)}
            </div>
          </div>
        </div>
      </Card>
      <div className={navigationClasses.join(" ")}>
        {hasPreviousLevel ? (
          <Button
            icon="arrow-left"
            iconPosition="left"
            to={`/level/${Number(batchNumber)}/${Number(order) - 1}`}
          ></Button>
        ) : null}
        {hasNextLevel ? (
          <Button
            icon="arrow-right"
            to={`/level/${Number(batchNumber)}/${Number(order) + 1}`}
          >
            Next level
          </Button>
        ) : null}
      </div>
      <Seo
        description={`${DEFAULT_TITLE} level by ${level.makerName}: ${level.levelName} - ${level.levelCode}`}
        title={`${level.levelName} | ${level.levelCode} | ${DEFAULT_TITLE}`}
        image={`${levelPath(level.levelName)}`}
        twitter="summary_large_image"
      />
    </div>
  );
};
export { Level };
export default Level;
