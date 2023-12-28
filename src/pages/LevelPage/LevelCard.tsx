import { Card } from "../../components/Card";
import { Difficulty } from "../../components/Difficulty";
import { PublicImage } from "../../components/PublicImage";
import { Tags } from "../../components/Tags";
import { parseMarkdown } from "../../parseMarkdown";
import { useLevel } from "../../theme/useLevel";
import styles from "./LevelCard.module.css";

type LevelCardProps = Pick<ReturnType<typeof useLevel>, 'level'>;

export function LevelCard({ level }: Readonly<LevelCardProps>) {
    const description = parseMarkdown(level.description);
    return <Card className={styles.LevelCard}>
        <div style={{ width: level.images.level.width + 'px', justifySelf: 'center' }}>
            <h2>{level.levelName.name}</h2>
            <PublicImage alt={level.levelName.name} {...level.images.level} />
            <h3 className={styles.LevelCode}>
                {level.levelCode || "Code coming soon"}
            </h3>
        </div>
        <div className={styles.TagsAndDifficulty}>
            <Tags tags={level.tags} />
            <Difficulty {...level} />
        </div>
        <div className={styles.Description}>{description}</div>
    </Card >
}