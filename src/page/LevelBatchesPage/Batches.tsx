import { Content } from "../../copy/Content";
import { useTheme } from "../../theme/useTheme";
import styles from "./Batches.module.css";

type Batch = ReturnType<typeof useTheme>["data"]["batches"][0];
function BatchesCard({ batch }: { readonly batch: Batch }) {
  return <Content.BatchCard batch={batch} />;
}

function mapReleaseDays(batch: Batch) {
  return <BatchesCard key={batch.batchNumber} batch={batch} />;
}

export function Batches() {
  const {
    data: { batches },
  } = useTheme();
  return (<>
    <div className={styles.Batches}>{batches.map(mapReleaseDays)}</div>
  </>);
}
