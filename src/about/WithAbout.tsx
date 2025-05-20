import * as React from "react";
import { Content } from "../copy/Content.js";
import { About } from "./About.js";
import { AboutButton } from "./AboutButton.js";

type WithAboutType = ThemeComponent<
  {
    info: ["caps", "snake", "writtenOut"];
    clickable: true;
    accordion: true;
    pathInfo: ["theme", "toAbout", "hash", "toAbout"];
  },
  typeof React.Fragment,
  {
    children: React.ReactNode;
    closeProps: React.JSX.IntrinsicElements["a"];
  }
>;

/**
 * This component adds the about button and the accordion content to the page.
 * Both use absolute positioning, so they could be rendered in any order. Usually
 * we add it at the bottom of the page.
 */
export const WithAbout: WithAboutType = ({
  info: { caps, snake, writtenOut },
  clickable,
  accordion,
  as: Component = React.Fragment,
  children,
  closeProps,
  pathInfo: { theme, hash, toAbout },
  ...props
}) => {
  return (
    <Component {...props}>
      {children}
      <AboutButton clickable={clickable} pathInfo={{ toAbout }} />

      <About
        closeProps={closeProps}
        clickable={clickable}
        visible={hash === "!/about"}
      >
        <Content.About
          pathInfo={{
            theme,
          }}
          info={{
            caps,
            snake,
            writtenOut,
          }}
          {...accordion}
        />
      </About>
    </Component>
  );
};
