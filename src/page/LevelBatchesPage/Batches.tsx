import styles from "./Batches.module.css";
import { Card } from "../../components/Card";
import { useTheme } from "../../theme/useTheme";

type Batch = ReturnType<typeof useTheme>['data']['batches'][0];
function BatchesCard({ batch }: {
  readonly batch: Batch;
}) {
  const { themeSlug } = useTheme();
  const amountOfLevels = batch.levels.length;
  return (
    <Card className={styles.BatchCard} to={`/${themeSlug}levels/${batch.batchNumber}/`}>
      <span className={styles.BatchNumber}>{batch.batchNumber}</span>
      <div className={styles.BatchInfo}>
        <span className={styles.BatchReleaseDay}>{batch.releaseDate.formatted}</span>
        <span className={styles.BatchLevelAmount}>
          {amountOfLevels} levels
        </span>
      </div>
    </Card>
  );
}

function mapReleaseDays(batch: Batch) {
  return <BatchesCard key={batch.releaseDate.date} batch={batch} />
}

export function Batches() {
  const { data: { batches } } = useTheme();
  return (
    <div className={styles.Batches}>
      {batches.map(mapReleaseDays)}
    </div>
  );
}
