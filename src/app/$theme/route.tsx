import * as React from "react";
import { getCss } from "../../css/getCss.js";

/**
 * Dynamic theme layout — wraps every un-migrated theme route (`/:theme`,
 * `/:theme/credits`, `/:theme/levels/**`) in the theme's `.Theme` div. It pulls
 * the class from the all-themes barrel (getCss), so MmcRoot's per-theme CSS
 * filter still trims the other themes' modules out of the response.
 *
 * A theme graduates to its own static `app/<theme>/route.tsx` folder (importing
 * only its one CSS module, no barrel, no filter). Static routes out-rank this
 * dynamic one, so a migrated theme stops flowing through here automatically.
 */
export const Layout = ({
  children,
  pathInfo,
}: {
  children?: React.ReactNode;
  pathInfo: { theme: Theme };
}) => <div className={getCss(pathInfo.theme, "Theme")}>{children}</div>;
