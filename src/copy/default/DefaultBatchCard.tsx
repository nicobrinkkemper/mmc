import { Card } from "../../components/Card";
import { useTheme } from "../../theme/useTheme";
import styles from "./BatchCard.module.css";

type Batch = ReturnType<typeof useTheme>["data"]["batches"][0];
export const DefaultBatchCard = ({ batch }: { readonly batch?: Batch }) => {
    const { themeSlug } = useTheme();
    if (!batch) return null;
    const amountOfLevels = `${batch.levels.length} levels`;
    return <Card
        className={styles.BatchCard}
        to={`/${themeSlug}levels/${batch.batchNumber}/`}
    >
        <span className={styles.BatchNumber}>{batch.batchNumber}</span>
        <div className={styles.BatchInfo}>
            <span className={styles.BatchReleaseDay}>
                {batch.releaseDate.formatted}
            </span>
            <span className={styles.BatchLevelAmount}>{amountOfLevels}</span>
        </div>
    </Card>
}