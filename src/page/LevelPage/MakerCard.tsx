import { CompileJSX } from "../../CompileJSX";
import { Card } from "../../components/Card";
import { MakerName } from "../../components/MakerName";
import { PublicImage } from "../../components/PublicImage";
import { useLevel } from "../../theme/useLevel";
import styles from "./MakerCard.module.css";

type MakerCardProps = Pick<ReturnType<typeof useLevel>, "level">;

export function MakerCard({ level }: Readonly<MakerCardProps>) {
  return (
    <Card className={styles.MakerCard}>
      <PublicImage
        alt={`Mii: ${level.makerName.name}`}
        src={level.images.maker.src}
        srcSet={level.images.maker.srcSet}
        width={level.images.maker.width}
        height={level.images.maker.height}
        className={styles.MakerImage}
      />
      <MakerName
        makerName={level.makerName.name}
        nationality={level.nationality}
        makerId={level.makerId}
      />
      <div className={styles.Description}>
        <CompileJSX>{level.makerDescription}</CompileJSX>
      </div>
    </Card>
  );
}
