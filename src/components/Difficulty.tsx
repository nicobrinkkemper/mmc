import Stars from "./Stars"
import styles from "./Difficulty.module.css"

export const Difficulty = ({ difficulty, difficultyName }: { difficulty: number, difficultyName: string }) => {
    return (
        <div className={styles.Difficulty}>
            <span className={`${styles.Label}`}>Difficulty: </span>
            <span className={`${styles.Indicator}`}>{
                difficulty ? <Stars value={difficulty} />
                    : difficultyName ?? "Who knows?"}
            </span>
        </div>
    )
}
