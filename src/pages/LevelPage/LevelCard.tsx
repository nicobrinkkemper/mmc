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
    return <Card subHeading={level.levelName.name} className={styles.LevelCard}>
        <div>
            <PublicImage alt={level.levelName.name} {...level.images.level} />
            <div className={styles.LevelCode}>
                {level.levelCode || "Code coming soon"}
            </div>
        </div>
        <div className={styles.TagsAndDifficulty}>
            <Tags tags={level.tags} />
            <Difficulty {...level} />
        </div>
        <div className={styles.Description}>{description}</div>
    </Card >
}