import Stars from "./Stars"
import { level } from "./useLevelData"

export const Difficulty = ({ level }: { level: level }) => {
    return (
        <div className={`difficulty`}>
            <span>Difficulty: </span>
            {level.difficulty ? <span className={`stars stars-${level.difficulty}`}>
                <Stars value={level.difficulty} />
            </span> : level.difficultyName ? <span className={`difficultyName`}>{level.difficultyName}</span> : "Who knows?"}
        </div>
    )
}
