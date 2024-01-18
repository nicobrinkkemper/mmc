import Button from "../../components/Button";
import { Card } from "../../components/Card";
import { ToTheLevels } from "../../components/ToTheLevels";
import { useTheme } from "../../theme/useTheme";
import styles from "./NotFound.module.css";

const NotFound = ({ error }: { error?: string }) => {
  const { themeSlug } = useTheme();
  return (
    <>
      <Card className={styles.Card}>
        <p>This page was not found, sorry! Jank can happen sometimes.</p>
        {error ? <p>The error message for the web developer: {error}</p> : null}
      </Card>
      <div className={styles.Buttons}>
        <ToTheLevels />
        <Button icon="arrow-right" to={`/${themeSlug}`}>
          To homepage
        </Button>
      </div>
    </>
  );
};

export { NotFound };
