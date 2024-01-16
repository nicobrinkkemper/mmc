import styles from "./Batch.module.css";
import { Card } from "../../components/Card";
import { PublicImage } from "../../components/PublicImage";
import { useTheme } from "../../theme/useTheme";
import { Difficulty } from "../../components/Difficulty";
import { useBatch } from "../../theme/useBatch";
import { MakerName } from "../../components/MakerName";
import { Tags } from "../../components/Tags";

export function Batch() {
  const { batch: { batchNumber, levels, releaseDate } } = useBatch();
  const { themeSlug } = useTheme();

  return (
    <>
      {levels.map((level, i) => {
        const to = `/${themeSlug}level/${batchNumber}/${i + 1}/`
        const tags = level.tags.find(v => !!v) ? level.tags : [('genre' in level && level.genre) || 'bonus'];
        if (!level.images.levelThumbnail) console.log('not found', level.levelName.slug)
        return (
          <Card heading={(i === 0 ? releaseDate.formatted : undefined)} key={to} to={to} className={styles.Batch}>
            <PublicImage alt={level.levelName.name} {...level.images.levelThumbnail} />
            <div className={styles.Info}>
              <h2>{level.levelName.name}</h2>
              <MakerName nationality={level.nationality} makerName={level.makerName.name} />
              <div className={styles.LevelInfo}>
                <Tags tags={tags} />
                <Difficulty {...level} />
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};
