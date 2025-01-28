import classNames from "clsx";
import React from "react";
import styles from "./Tags.module.css";


export const Tags: ThemeComponent<{
  level: ["tags"];
}> = ({ level }) => {
  return (
    <div className={styles["Tags"]}>
      {Object.entries(level.tags).map(([key, tag], i) => {
        let uniqueKey = key + i;
        return (
          <span
            className={classNames(
              styles["Tag"],
              styles[key as keyof typeof styles]
            )}
            key={uniqueKey}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};
