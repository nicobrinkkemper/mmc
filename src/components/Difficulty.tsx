import React from "react";
import styles from "./Difficulty.module.css";
import { Stars } from "./Stars.js";

export const Difficulty: ThemeComponent<{
  level: ["difficulty", "difficultyName"];
}> = ({ level: { difficulty, difficultyName } }) => {
  return (
    <div className={styles["Difficulty"]}>
      <span className={styles["Label"]}>Difficulty: </span>
      <span className={styles["Stars"]}>
        {typeof difficulty === "number" ? (
          <Stars level={{ difficulty }} />
        ) : (
          difficultyName
        )}
      </span>
    </div>
  );
};
