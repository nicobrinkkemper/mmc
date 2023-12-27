import "./NotFound.css";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import { useTheme } from "../../theme/useTheme";
import { ToTheLevels } from "../../components/ToTheLevels";

const NotFound = ({ error }: { error?: string }) => {
  const { themeSlug } = useTheme();
  return (
    <div className="NotFound">
      <Card>
        <p>This page was not found, sorry! Jank can happen sometimes.</p>
        {error ? <p>The error message for the web developer: {error}</p> : null}
        <p>
          <ToTheLevels />
        </p>
        <p>
          <Button icon="arrow-right" to={`/${themeSlug}`}>
            To homepage
          </Button>
        </p>
      </Card>
    </div >
  );
};

export { NotFound };
