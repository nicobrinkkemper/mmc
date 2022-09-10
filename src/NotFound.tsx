import "./NotFound.css";
import Button from "./Button";
import Card from "./Card";
import Seo from "./Seo";
import { DEFAULT_TITLE } from "./constants";

const NotFound = ({error}:{error:string}) => {
  return (
    <div className="NotFound">
      <Card>
        <p>This page was not found, sorry! Jank can happen sometimes.</p>
        <p>The error message for the web developer: {error}</p>
        <p>
          <Button primary={true} icon="arrow-right" to="/levels/">
            To the levels
          </Button>
        </p>
        <p>
          <Button icon="arrow-right" to="/">
            To homepage
          </Button>
        </p>
      </Card>
      <Seo title={`404 | Jank Not Found | ${DEFAULT_TITLE}`} />
    </div>
  );
};

export { NotFound };
export default NotFound;
