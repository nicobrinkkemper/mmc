import { useBatch } from "../../theme/useBatch";
import styles from "./BatchCard.module.css";
import { batchContent } from "./BatchContent";

export const BatchHeader = ({ }) => {
    const batch = useBatch();
    const content = batchContent[batch.batchNumber];
    if (!content) return null;

    return (
        <div className={styles.BatchHeader}>
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
            </div>
        </div>
    );
}