import { DEFAULT_DESCRIPTION } from "../../config/constants.js";

export const CreditsPageSeo = ({ caps }: { caps: string }) => ({
  description: `Special thanks to all contributors! ${DEFAULT_DESCRIPTION}`,
  title: `${caps} | Credits | Site by General BB`,
});
