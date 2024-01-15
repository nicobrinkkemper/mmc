import { Card } from "../../components/Card";
import { MakerName } from "../../components/MakerName";
import { PublicImage } from "../../components/PublicImage";
import { parseMarkdown } from "../../parseMarkdown";
import { useLevel } from "../../theme/useLevel";
import styles from "./MakerCard.module.css";

type MakerCardProps = Pick<ReturnType<typeof useLevel>, 'level'>;

export function MakerCard({ level }: Readonly<MakerCardProps>) {

    const description = parseMarkdown(level.makerDescription);
    return <Card className={styles.MakerCard}>
        <PublicImage alt={level.makerName.name} {...level.images.maker} />
        <MakerName makerName={level.makerName.name} nationality={level.nationality} makerId={level.makerId} />
        <div className={styles.Description}>
            {description}
        </div>
    </Card>
}