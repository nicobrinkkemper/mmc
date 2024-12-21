import { Card } from "../../components/Card";
import { Difficulty } from "../../components/Difficulty";
import { MakerName } from "../../components/MakerName";
import { PublicImage } from "../../components/PublicImage";
import { Tags } from "../../components/Tags";
import { Content } from "../../copy/Content";
import { useBatch } from "../../theme/useBatch";
import { useTheme } from "../../theme/useTheme";
import styles from "./Batch.module.css";

type BatchLevel = ReturnType<typeof useBatch>["batch"]["levels"][number];

function BatchLevelCard({
  level,
  levelNumber,
}: Readonly<{
  level: BatchLevel;
  levelNumber: number;
}>) {
  const batch = useBatch();
  const {
    batch: { releaseDate, batchNumber },
  } = batch;
  const { themeSlug } = useTheme();
  const slug = `${batchNumber}/${levelNumber}`;
  return (
    <Card
      heading={levelNumber === 1 ? <Content.BatchHeader levelNumber={levelNumber} /> : undefined}
      key={slug}
      to={`/${themeSlug}level/${slug}/`}
      className={styles.Batch}
    >
      <PublicImage
        alt={level.levelName.name}
        {...level.images.levelThumbnail}
      />
      <div className={styles.Info}>
        <h2>{level.levelName.name}</h2>
        <MakerName
          nationality={level.nationality}
          makerName={level.makerName.name}
        />
        <div className={styles.LevelInfo}>
          <Tags tags={level.tags} />
          <Difficulty {...level} />
        </div>
      </div>
    </Card>
  );
}

function mapLevels(level: BatchLevel, i: number) {
  return (
    <BatchLevelCard
      key={level.levelName.name}
      level={level}
      levelNumber={i + 1}
    />
  );
}

export function Batch() {
  const {
    batch: { levels },
  } = useBatch();

  return levels.map(mapLevels);
}