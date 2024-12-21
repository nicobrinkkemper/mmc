import { Card } from "../../components/Card";
import { useTheme } from "../../theme/useTheme";
import styles from "./BatchCard.module.css";
import { batchContent } from "./BatchContent";

type Batch = ReturnType<typeof useTheme>["data"]["batches"][0];
export const BatchCard = ({ batch }: { readonly batch?: Batch }) => {
    const { themeSlug } = useTheme();
    if (!batch) return null;
    const content = batchContent[batch.batchNumber];
    if (!content) return null;

    const amountOfLevels = `${batch.levels.length} levels`;
    return <Card
        className={styles.BatchCard}
        to={`/${themeSlug}levels/${batch.batchNumber}/`}
    >
        {/* <span className={styles.BatchNumber}>{batch.batchNumber}</span> */}
        <div className={styles.BatchIcon}>
            {content.icon}
        </div>
        <div className={styles.BatchInfo}>
            <span className={styles.BatchTitle}>
                {content.title}
            </span>
            <span className={styles.BatchDescription}>
                {content.description}
            </span>
            <span className={styles.BatchLevelAmount}>{amountOfLevels}</span>
        </div>
    </Card>
}