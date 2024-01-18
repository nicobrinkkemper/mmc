import classNames from "classnames";
import styles from "./Tags.module.css";

export function Tags({
  tags,
}: Readonly<{ tags: Record<string, string | undefined> }>) {
  return (
    <div className={styles.Tags}>
      {Object.entries(tags).map(([key, tag]) => {
        return (
          <span className={classNames(styles.Tag, styles[key])} key={key}>
            {tag}
          </span>
        );
      })}
    </div>
  );
}
