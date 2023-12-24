import "./Batches.css";
import { Card } from "../../components/Card";
import Seo from "../../components/Seo";
import { useTheme } from "../../theme/useTheme";
import classNames from "classnames";

type Batch = ReturnType<typeof useTheme>['data']['batches'][0];
function BatchesCard({ batch }: {
  readonly batch: Batch;
}) {
  const { themeSlug } = useTheme();
  const classes = ["BatchCard"];

  return (
    <Card className={classNames(classes)} to={`/${themeSlug}levels/${batch.batchNumber}/`}>
      <span className="batchNumber">{batch.batchNumber}</span>
      <div className="releaseInfo">
        <span className="releaseDay">{batch.releaseDate.formatted}</span>
        <span className="batchLevelAmount">
          {batch.levels.length} levels
        </span>
      </div>
      <div className="tags">
      </div>
    </Card>
  );
}

function mapReleaseDays(batch: Batch) {
  return <BatchesCard key={batch.releaseDate.date} batch={batch} />
}

export function Batches() {
  const { info: { caps }, data: { batches } } = useTheme();
  return (
    <>
      {batches.map(mapReleaseDays)}
      <Seo
        description={`Week overview of ${caps}. ${batches.length} weeks released so far!`}
        title={`${caps} | Week overview`}
      />
    </ >
  );
}
