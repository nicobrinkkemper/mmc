import classNames from "classnames";
import * as React from "react";
import styles from "./Tags.module.css";

type TagsProps =
  | Pick<
      ThemeStaticData<`/${Theme}/level/${NumberParam}/${NumberParam}`>["level"],
      "tags"
    >
  | Pick<ThemeStaticData<`/${Theme}/levels/${NumberParam}`>["batch"], "tags">;

export function Tags({ tags }: TagsProps) {
  return (
    <div className={styles["Tags"]}>
      {Object.entries(tags).map(([key, tag]) => {
        return (
          <span
            className={classNames(
              styles["Tag"],
              styles[key as keyof typeof styles]
            )}
            key={key}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
