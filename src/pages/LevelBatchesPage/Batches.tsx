import "./Batches.css";
import { Card } from "../../Card";
import { useLevelData } from "../../useLevelData";
import Seo from "../../Seo";
import { formatDate } from "../../formatDate";
import { useTheme } from "../../theme/useTheme";
import classNames from "classnames";

function BatchesCard({ releaseDay, batchIndex }: {
  readonly releaseDay: Date;
  readonly batchIndex: number;
}) {
  const levelData = useLevelData();
  const { themeSlug } = useTheme();
  const batchNumber = batchIndex + 1;
  const classes = ["BatchCard"];
  const isUnreleased =
    levelData.releasedBatches.indexOf(releaseDay) === -1;

  const isFinalWeek = levelData.releaseDays.indexOf(releaseDay) === 5;

  const isNew = levelData.newestBatch === batchIndex;

  const levelAmount = isUnreleased ? 8 : levelData.batch(batchNumber).length;

  if (isNew) classes.push("isNew");
  if (isUnreleased) classes.push("isUnreleased");
  if (isFinalWeek) classes.push("isFinal");
  return (
    <Card className={classNames(classes)} disabled={isUnreleased} to={`/${themeSlug}levels/${batchNumber}/`}>
      <span className="batchNumber">{batchNumber}</span>
      <div className="releaseInfo">
        <span className="releaseDay">{formatDate(releaseDay)}</span>
        <span className="batchLevelAmount">
          {levelAmount} levels
        </span>
      </div>
      <div className="tags">
        {isNew ? <span className="new">New</span> : null}
        {isUnreleased ?? (
          <span className="unreleased">Unreleased</span>
        )}
        {(isFinalWeek && !isUnreleased) ?? (
          <span className="final">Finale</span>
        )}
      </div>
    </Card>
  );
}

function mapReleaseDays(releaseDay: Date, batchIndex: number) {
  return <BatchesCard key={releaseDay.toISOString()} releaseDay={releaseDay} batchIndex={batchIndex} />
}

function BatchesCards() {
  return useLevelData().releaseDays.map(mapReleaseDays)
}

function Batches() {
  const amountOfLevels = useLevelData().releasedBatches.length;
  const { info: { caps } } = useTheme();
  return (
    <>
      <BatchesCards />
      <Seo
        description={`Week overview of ${caps}. ${amountOfLevels} weeks released so far!`}
        title={`${caps} | Week overview`}
      />
    </ >
  );
}
export { Batches };
