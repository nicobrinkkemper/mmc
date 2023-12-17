import "./NotFound.css";
import Button from "../../Button";
import { Card } from "../../Card";
import Seo from "../../Seo";
import { useTheme } from "../../theme/useTheme";
import { ToTheLevels } from "../../ToTheLevels";

const NotFound = ({ error }: { error?: string }) => {
  const { themeSlug, info: { caps } } = useTheme();
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
      <Seo title={`404 | Jank Not Found | ${caps}`} />
    </div >
  );
};

export { NotFound };
