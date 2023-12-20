import "./Batch.css";
import { Card } from "../../components/Card";
import { snakeCase } from "lodash";
import Seo from "../../components/Seo";
import { PublicImage } from "../../components/PublicImage";
import { useTheme } from "../../theme/useTheme";
import { convertNumberToWord } from "../../theme/convertNumberToWord";
import { Difficulty } from "../../components/Difficulty";
import { useLevelFromParams } from "../../level/useLevelFromParams";
import classNames from "classnames";
import { MakerName } from "../../components/MakerName";

const humanReadableArray = <ARR extends readonly string[]>(a: ARR): string => {
  if (a.length === 1) return a[0];
  return [a.slice(0, a.length - 1).join(", "), a[a.length - 1]].join(" and ");
};

export function Batch() {
  const level = useLevelFromParams();
  const { batch: { batchNumber, levels, releaseDate } } = level;
  const { themeSlug, info: { caps, writtenOut } } = useTheme();

  return (
    <>
      <h1>
        {new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
        }).format(new Date(releaseDate.date))}
      </h1>
      <div className={classNames('Batch')}>

        {levels.map((level) => {
          const to = `/${themeSlug}level/${batchNumber}/${level.order}/`
          if (!level.levelThumbnail) console.log('not found', level.levelName.slug)
          return (
            <Card key={to} to={to} className={'BatchLevel'}>
              <PublicImage alt={level.levelName.name} {...level.levelThumbnail} />
              <div className="info">
                <div className="makerInfo">
                  <span className={"levelName"}>{level.levelName.name}</span>
                  <MakerName nationality={level.nationality} makerName={level.makerName.name} />
                </div>
                <div className="levelInfo">
                  <div className={"tags"}>
                    {(level.tags.find(v => !!v) ? level.tags : [level.genre || 'bonus']).map((tag) => (
                      <span className={`tag ${snakeCase(tag)}`} key={snakeCase(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Difficulty {...level} />
                </div>
              </div>
              <Seo
                description={`Week ${batchNumber} of ${caps} has started! In this week's trailer we show off ${convertNumberToWord(levels.length)} new levels: ${humanReadableArray(levels.map(({ levelName: { name } }) => name))}. Celebrating ${writtenOut}! Week ${batchNumber} released at ${releaseDate.formatted}.`}
                title={`${caps} | Week ${batchNumber}`}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};
