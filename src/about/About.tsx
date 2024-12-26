import classNames from "classnames";
import * as React from "react";
import { DefaultAboutContentStatic } from "../copy/default/DefaultAboutContent.js";
import { default as classes } from "./About.module.css";
import { CloseSvg } from "./CloseSvg.js";

export type AboutStaticProps<P extends ValidPath = ValidPath> = {
  info: ThemeInfo<ThemePathInfo<P>["theme"]>;
  pathInfo: ThemePathInfo<P>;
  closeProps?: React.JSX.IntrinsicElements["a"];
  accordion: React.ElementType;
  accordionItem: React.ElementType;
  accordionItemHeading: React.ElementType;
  accordionItemButton: React.ElementType;
  accordionItemPanel: React.ElementType;
};

export const AboutStatic = <P extends ValidPath = ValidPath>({
  closeProps,
  info,
  pathInfo,
  accordion: Accordion = "div",
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemButton: AccordionItemButton = "a",
  accordionItemPanel: AccordionItemPanel = "div",
}: AboutStaticProps<P>) => {
  return (
    <div className={classes["outer"]} id={"!/about"}>
      <div className={classes["main"]}>
        <div className={classes["inner"]}>
          <div className={classes["header"]}>
            <a
              className={classNames(classes["close"], closeProps?.className)}
              {...closeProps}
            >
              <CloseSvg />
            </a>
          </div>
          <div className={classes["body"]}>
            <div>
              <DefaultAboutContentStatic
                info={info}
                pathInfo={pathInfo}
                accordion={Accordion}
                accordionItem={AccordionItem}
                accordionItemHeading={AccordionItemHeading}
                accordionItemButton={AccordionItemButton}
                accordionItemPanel={AccordionItemPanel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
