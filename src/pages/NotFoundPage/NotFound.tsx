import "./NotFound.css";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import Seo from "../../components/Seo";
import { useTheme } from "../../theme/useTheme";
import { ToTheLevels } from "../../components/ToTheLevels";

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
