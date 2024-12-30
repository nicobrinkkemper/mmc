import * as React from "react";
import { Page as HomePage } from "./:theme/page.js";

/**
 * This is the root page. We will just render the home page using the main theme.
 */
export const Page: ThemePageComponent<"/"> = ({
  images,
  info,
  pathInfo: { route, to, ...pathInfo },
  adjacent: { next, prev },
  clickable,
  ...props
}) => {
  return (
    <HomePage
      {...props}
      images={images}
      info={info}
      pathInfo={{
        ...pathInfo,
        // the only thing that is different
        // but I like to list out all the props, so that when something changes
        // it will show up accurately in the code
        // and when something needs drilling down, it will be easy to find
        route: "/:theme",
        to: pathInfo.toHome,
      }}
      adjacent={{ next, prev }}
      clickable={clickable}
    />
  );
};
