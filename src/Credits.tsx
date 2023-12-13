import Seo from "./Seo";
import { DEFAULT_DESCRIPTION } from "./constants";
import { CreditsContent } from "./content/CreditsContent";
import { useTheme } from "./theme/useTheme";

const Credits = () => {
  const { info: { caps } } = useTheme();
  return (
    <>
      <CreditsContent />
      <Seo
        description={`Special thanks to all contributors! ${DEFAULT_DESCRIPTION}`}
        title={`${caps} | Credits | Site by General BB`}
      />
    </>
  );
};
export { Credits };
export default Credits;
