import "./Level.css";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import Seo from "../../components/Seo";
import { parseMarkdown } from "../../parseMarkdown";
import { PublicImage } from "../../components/PublicImage";
import { Difficulty } from "../../components/Difficulty";
import classNames from "classnames";
import { snakeCase } from "lodash";
import { useTheme } from "../../theme/useTheme";
import { useLevelFromParams } from "../../level/useLevelFromParams";

export function Level() {
  const { level, batchNumber, order, orderIndex, batch } = useLevelFromParams();
  const {
    theme,
    info: { caps },
  } = useTheme();

  const hasPreviousLevel = orderIndex > 0;
  const hasNextLevel = orderIndex < batch.levels.length - 1;
  const lastWeek = new Date("last week");
  const isNew = batch.levels.find(
    (level) => new Date(level.releaseDate.date) > lastWeek
  );
  const isUnreleased = new Date(batch.releaseDate.date) > new Date();

  const classes = ["Level"];
  const navigationClasses = ["navigation"];
  if (hasPreviousLevel) navigationClasses.push("hasPreviousLevel");
  if (hasNextLevel) navigationClasses.push("hasNextLevel");
  if (isNew) classes.push("isNew");
  if (isUnreleased) classes.push("isUnreleased");

  const prevLevelSlug = hasPreviousLevel
    ? `/${theme}/level/${batchNumber}/${Number(order) - 1}/`
    : undefined;

  const nextLevelSlug = hasNextLevel
    ? `/${theme}/level/${batchNumber}/${Number(order) + 1}/`
    : undefined;

  return (
    <div className={classNames(classes)}>
      <Card>
        <div className="info level">
          <h2 className={"levelName"}>{level.levelName.name}</h2>
          <PublicImage alt={level.levelName.name} {...level.level} />
          <div className="levelCode">
            {level.levelCode || "Code coming soon"}
          </div>
          <div className="levelInfo">
            <div className={"tags"}>
              {level.tags.map((tag) => (
                <span className="tag" key={snakeCase(tag)}>
                  {tag}
                </span>
              ))}
            </div>

            <Difficulty {...level} />
          </div>
          <div className="description">{parseMarkdown(level.description)}</div>
        </div>
      </Card>
      <Card>
        <div className="info maker">
          <PublicImage alt={level.makerName.name} {...level.maker} />
          <div className={"makerName"}>
            <span className="name">
              <span
                className={`nationality flag-icon flag-icon-${level.nationality.toLowerCase()}`}
              />
              {level.makerName.name}
            </span>
            <span className="makerId">{level.makerId}</span>
          </div>
          <div className="makerDescription" style={{ whiteSpace: "pre-line" }}>
            {parseMarkdown(level.makerDescription)}
          </div>
        </div>
      </Card>
      <div className={classNames(navigationClasses)}>
        {prevLevelSlug ? (
          <Button
            icon="arrow-left"
            iconPosition="left"
            to={prevLevelSlug}
          ></Button>
        ) : null}
        {nextLevelSlug ? (
          <Button icon="arrow-right" to={nextLevelSlug}>
            Next level
          </Button>
        ) : null}
      </div>
      <Seo
        description={`${caps} level by ${level.makerName.name}: ${level.levelName.name} - ${level.levelCode}`}
        title={`${level.levelName.name} | ${level.levelCode} | ${caps}`}
        image={level.level[580][0]}
        twitter="summary_large_image"
      />
    </div>
  );
}
