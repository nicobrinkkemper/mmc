import * as React from "react";
import styles from "./Difficulty.module.css";
import { Stars } from "./Stars.js";

export const Difficulty = ({ difficulty, difficultyName }: { difficulty: number, difficultyName: string }) => {
    return (
        <div className={styles['Difficulty']}>
            <span className={`${styles['Label']}`}>Difficulty: </span>
            <span className={`${styles['Stars']}`}>{
                difficulty ? <Stars value={difficulty} />
                    : difficultyName ?? "Who knows?"}
            </span>
        </div>
    )
}
