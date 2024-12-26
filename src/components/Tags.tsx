import classNames from "classnames";
import * as React from "react";
import styles from "./Tags.module.css";


export const Tags: ThemePageComponent<
  `/${Theme}/level/${string}/${string}`,
  {
    level: ["tags"];
  }
> = ({ level }) => {
  return (
    <div className={styles["Tags"]}>
      {Object.entries(level.tags).map(([key, tag]) => {
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
};
