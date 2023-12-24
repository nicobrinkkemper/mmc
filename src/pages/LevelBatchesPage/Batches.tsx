import "./Batches.css";
import { Card } from "../../components/Card";
import Seo from "../../components/Seo";
import { useTheme } from "../../theme/useTheme";
import classNames from "classnames";

type Batch = ReturnType<typeof useTheme>['data']['batches'][0];
function BatchesCard({ batch, batchIndex, totalBatches }: {
  readonly batch: Batch;
  readonly batchIndex: number;
  readonly totalBatches: number;
}) {
  const { themeSlug } = useTheme();
  const classes = ["BatchCard"];

  return (
    <Card className={classNames(classes)} to={`/${themeSlug}levels/${batch.batchNumber}/`}>
      <span className="batchNumber">{batch.batchNumber}</span>
      <div className="releaseInfo">
        <span className="releaseDay">{batch.releaseDate.formatted}</span>
        <span className="batchLevelAmount">
          {totalBatches} levels
        </span>
      </div>
      <div className="tags">
      </div>
    </Card>
  );
}

function mapReleaseDays(batch: Batch, batchIndex: number) {
  return <BatchesCard key={batch.releaseDate.date} batch={batch} batchIndex={batchIndex} totalBatches={batch.levels.length} />
}

function BatchesCards() {
  return useTheme().data.batches.map(mapReleaseDays)
}

function Batches() {
  const { info: { caps }, data } = useTheme();
  return (
    <>
      <BatchesCards />
      <Seo
        description={`Week overview of ${caps}. ${data.batches.length} weeks released so far!`}
        title={`${caps} | Week overview`}
      />
    </ >
  );
}
export { Batches };
