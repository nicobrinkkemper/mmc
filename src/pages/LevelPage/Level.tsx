import "./Level.css";
import { useParams } from "react-router-dom";
import { Card } from "../../Card";
import { useLevelData } from "../../useLevelData";
import { Button } from "../../Button";
import Seo from "../../Seo";
import { parseMarkdown } from "../../runtimeMarkdown";
import { PublicImage } from "../../PublicImage";
import { useTheme } from "../../theme/useTheme";
import { Difficulty } from "../../Difficulty";
import classNames from "classnames";
import { TransformName } from "../../TransformName";
import * as levelImages from "../../data/levelImages";
import * as makerImages from "../../data/makerImages";
const Level = () => {
  const { batchNumber: strBatchNumber, order: strOrder } =
    useParams<Record<"batchNumber" | "order", string>>();
  const order = Number(strOrder);
  const levelData = useLevelData();
  const batchLevels = levelData.levels(Number(strBatchNumber));
  const level = batchLevels.find(({ order: _order }) => _order === order);
  const { theme, themeSlug, info: { caps } } = useTheme();
  if (typeof level !== "object") return <span>There is nothing here. Please come back later.</span>;
  const startOrder = batchLevels[0].order;
  const endOrder = batchLevels[batchLevels.length - 1].order;
  const batchNumber = Number(level.batchNumber);
  if (Number(strBatchNumber) !== level.batchNumber)
    return <span>A problem occurred. Please come back later.</span>;
  const releaseDay = levelData.releaseDays[batchNumber - 1];
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
  const transformedLevelName = TransformName(level.levelName);
  const transformedMakerName = TransformName(level.makerName);
  const levelImage = levelImages[`_${theme}`][transformedLevelName as never] as { placeholder: string };
  const makerImage = makerImages[`_${theme}`][transformedMakerName as never] as { placeholder: string };
  if (!makerImage) console.log("Not found", transformedMakerName, makerImage)
  if (!levelImage) console.log("Not found", transformedLevelName, levelImage)
  return (
    <div className={classNames(classes)}>
      <Card>
        <div className="info level">
          <h2 className={"levelName"}>{level.levelName}</h2>
          <PublicImage width={580} alt={level.levelName} {...levelImage} />
          <div className="levelCode">
            {level.levelCode || "Code coming soon"}
          </div>
          <div className="levelInfo">
            <div className={"tags"}>
              {tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <Difficulty level={level} />
          </div>
          <div className="description">{parseMarkdown(level.description)}</div>
        </div>
      </Card>
      <Card>
        <div className="info maker">
          <PublicImage width={180} height={180} alt={level.makerName} {...makerImage} />
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
      </Card>
      <div className={navigationClasses.join(" ")}>
        {hasPreviousLevel ? (
          <Button
            icon="arrow-left"
            iconPosition="left"
            to={`/${themeSlug}level/${Number(batchNumber)}/${Number(order) - 1}/`}
          ></Button>
        ) : null}
        {hasNextLevel ? (
          <Button
            icon="arrow-right"
            to={`/${themeSlug}level/${Number(batchNumber)}/${Number(order) + 1}/`}
          >
            Next level
          </Button>
        ) : null}
      </div>
      <Seo
        description={`${caps} level by ${level.makerName}: ${level.levelName} - ${level.levelCode}`}
        title={`${level.levelName} | ${level.levelCode} | ${caps}`}
        image={`/${themeSlug}level/${transformedLevelName}-1160.webp`}
        twitter="summary_large_image"
      />
    </div>
  );
};
export { Level };
export default Level;
