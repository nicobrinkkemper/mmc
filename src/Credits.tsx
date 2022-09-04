import "./Credits.css";
import Seo from "./Seo";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "./constants";
import { CreditsContent } from "content/CreditsContent";

const Credits = () => {
  return (
    <div className="Credits">
      <CreditsContent />
      <Seo
        description={`Special thanks to all contributors! ${DEFAULT_DESCRIPTION}`}
        title={`${DEFAULT_TITLE} | Credits | Site by General BB`}
      />
    </div>
  );
};
export { Credits };
export default Credits;
