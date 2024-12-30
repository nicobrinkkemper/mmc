import * as React from "react";
import { App } from "../../../App.js";
import { Button } from "../../../components/Button.js";
import { Layout } from "../../../layout/Layout.js";
import { BatchList } from "./BatchList.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  batches,
  images,
  pathInfo,
  clickable,
  adjacent,
  info: { caps },
}) => {
  return (
    <App
      pathInfo={{
        theme: pathInfo.theme,
      }}
    >
      <Layout
        images={images}
        pathInfo={{
          toHome: pathInfo.toHome,
          toCredits: pathInfo.toCredits,
        }}
        clickable={clickable}
        adjacent={adjacent}
      >
        <Button
          icon="arrow-left-inverted"
          iconPosition="left"
          href={pathInfo.toHome}
          inverted={true}
          clickable={clickable}
        >
          Back to Welcome
        </Button>
        <BatchList batches={batches} clickable={clickable} />
      </Layout>
    </App>
  );
};
