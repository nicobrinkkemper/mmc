import { siteName } from "../../config/themeConfig.js";

export const CreditsPageSeo = ({ caps }: { caps: string }) => ({
  description: `Special thanks to all contributors! ${siteName}`,
  title: `${caps} | Credits | Site by General BB`,
});
