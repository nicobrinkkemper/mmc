import Stars from "./Stars"

export const Difficulty = ({ difficulty, difficultyName }: { difficulty: number, difficultyName: string }) => {
    return (
        <div className={`difficulty`}>
            <span>Difficulty: </span>
            {difficulty ? <span className={`stars stars-${difficulty}`}>
                <Stars value={difficulty} />
            </span> : difficultyName ? <span className={`difficultyName`}>{difficultyName}</span> : "Who knows?"}
        </div>
    )
}
