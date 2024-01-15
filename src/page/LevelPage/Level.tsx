import { Button } from "../../components/Button";
import classNames from "classnames";
import { useLevel } from "../../theme/useLevel";
import { LevelCard } from "./LevelCard";
import styles from "./Level.module.css";
import { MakerCard } from "./MakerCard";

export function Level() {
  const { level, hasPreviousLevel, hasNextLevel, prevLevelSlug, nextLevelSlug } = useLevel();

  const classes = [styles.Navigation];
  if (hasPreviousLevel) classes.push(styles.hasPreviousLevel);
  if (hasNextLevel) classes.push(styles.hasNextLevel);

  return (
    <>
      <LevelCard level={level} />
      <MakerCard level={level} />
      <div className={classNames(classes)}>
        {prevLevelSlug ? (
          <Button
            icon="arrow-left"
            iconPosition="left"
            to={prevLevelSlug}
          ></Button>
        ) : null}
        {nextLevelSlug ? (
          <Button icon="arrow-right" to={nextLevelSlug}>
            Next level
          </Button>
        ) : null}
      </div>
    </>
  );
}
