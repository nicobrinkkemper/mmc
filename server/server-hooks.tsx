import React from "react";
import { getCssStore } from "./cssStore.mjs";
import { RenderHead } from "./Render.js";

function usePage({
  pathInfo,
}: {
  pathInfo: ThemePathInfo;
}): () => [React.ReactNode, React.ReactNode] {
  const path = pathInfo.route.replace(/:/g, "_");
  const cssStore = getCssStore();

  // Import and destructure Page component
  const { Page: PageComponent } = React.use(
    import(`../src/page${path === "/" ? "" : path}/page.js`)
  );

  // Get props for both components
  const { pathInfo: propsPathInfo = null, ...props } = useProps({ pathInfo });

  // Create the components with collected CSS
  const Head = (
    <RenderHead
      key={pathInfo.route + "head"}
      pathInfo={
        {
          ...propsPathInfo,
          ...pathInfo,
        } as ThemePathInfo<ValidRoute>
      }
      {...props}
      criticalCss={cssStore.getCss()}
    />
  );
  const Page = (
    <PageComponent
      {...props}
      key={pathInfo.route + "head"}
      pathInfo={
        {
          ...propsPathInfo,
          ...pathInfo,
        } as ThemePathInfo<ValidRoute>
      }
    />
  );

  return () => [Head, Page];
}

function useProps({ pathInfo }: { pathInfo: ThemePathInfo }) {
  const path = pathInfo.route.replace(/:/g, "_");
  const { props: Props } = React.use(
    import(`../src/page${path === "/" ? "" : path}/props.js`)
  );
  const propsReturn = React.use(Props(pathInfo.to));
  return propsReturn as ThemeStaticDataReturn<ValidRoute, ThemeDataOptions>;
}

export { usePage, useProps };
