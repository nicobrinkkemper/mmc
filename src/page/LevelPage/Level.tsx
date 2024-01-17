import classNames from "classnames";
import { Button } from "../../components/Button";
import { useLevel } from "../../theme/useLevel";
import styles from "./Level.module.css";
import { LevelCard } from "./LevelCard";
import { MakerCard } from "./MakerCard";

export function Level() {
  const {
    level,
    hasPreviousLevel,
    hasNextLevel,
    prevLevelSlug,
    nextLevelSlug,
  } = useLevel();

  return (
    <>
      <LevelCard level={level} />
      <MakerCard level={level} />
      <div
        className={classNames(
          styles.Navigation,
          hasNextLevel && styles.hasNextLevel,
          hasPreviousLevel && styles.hasPreviousLevel
        )}
      >
        <Button
          icon="arrow-left"
          iconPosition="left"
          to={prevLevelSlug ?? "#"}
          hidden={!prevLevelSlug}
        >
          <span className={styles.hidden}>Previous</span>
        </Button>
        <Button
          icon="arrow-right"
          to={nextLevelSlug ?? "#"}
          hidden={!nextLevelSlug}
        >
          Next level
        </Button>
      </div>
    </>
  );
}
