import * as React from "react";
import styles from "./Difficulty.module.css";
import { Stars } from "./Stars.js";

type DifficultyProps = Pick<
  ThemeStaticData<`/${Theme}/level/${NumberParam}/${NumberParam}`>["level"],
  "difficulty" | "difficultyName"
>;

export const Difficulty = ({ difficulty, difficultyName }: DifficultyProps) => {
  return (
    <div className={styles["Difficulty"]}>
      <span className={`${styles["Label"]}`}>Difficulty: </span>
      <span className={`${styles["Stars"]}`}>
        {difficulty ? (
          <Stars value={difficulty} />
        ) : (
          difficultyName ?? "Who knows?"
        )}
      </span>
    </div>
  );
};
