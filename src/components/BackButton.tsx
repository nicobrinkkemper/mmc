import { useLevel } from "../theme/useLevel";
import { useTheme } from "../theme/useTheme";
import { useThemeLevelData } from "../theme/useThemeLevelData";
import styles from "./BackButton.module.css";
import Button from "./Button";

function BackToBatch() {
  const { themeSlug } = useTheme();
  const { batchNumber, batch } = useLevel();

  return (
    <Button
      icon="arrow-left-inverted"
      iconPosition="left"
      to={`/${themeSlug}levels/${batchNumber}/`}
      inverted={true}
      className={styles.BackButton}
    >
      {`Back to ${batch.releaseDate.formatted}`}
    </Button>
  );
}

function BackToWeeks() {
  const { themeSlug } = useTheme();

  return (
    <Button
      icon="arrow-left-inverted"
      iconPosition="left"
      to={`/${themeSlug}levels/`}
      inverted={true}
      className={styles.BackButton}
    >
      Back to Weeks
    </Button>
  );
}

function BackToWelcome() {
  const { themeSlug } = useTheme();

  return (
    <Button
      icon="arrow-left-inverted"
      iconPosition="left"
      to={`/${themeSlug}`}
      inverted={true}
      className={styles.BackButton}
    >
      Back to Welcome
    </Button>
  );
}

const BackButton = () => {
  const { hasBatch, hasLevel } = useThemeLevelData();
  const {
    info: { isHome },
  } = useTheme();
  if (hasBatch && hasLevel) return <BackToBatch />;
  else if (hasBatch) return <BackToWeeks />;
  if (isHome) return null;
  return <BackToWelcome />;
};

export { BackButton };
