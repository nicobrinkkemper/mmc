import classNames from "classnames";
import * as React from "react";
import { DefaultAboutContentStatic } from "../copy/default/DefaultAboutContent.js";
import { default as classes } from "./About.module.css";
import { CloseSvg } from "./CloseSvg.js";

type AboutType = ThemeComponent<
  {
    info: ["caps", "snake", "writtenOut"];
  },
  "div",
  {
    closeProps: React.JSX.IntrinsicElements["a"];
    accordion: React.ElementType;
    accordionItem: React.ElementType;
    accordionItemHeading: React.ElementType;
    accordionItemButton: React.ElementType;
    accordionItemPanel: React.ElementType;
  }
>;

export const AboutStatic: AboutType = ({
  closeProps,
  info: { caps, snake, writtenOut },
  accordion: Accordion = "div",
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemButton: AccordionItemButton = "a",
  accordionItemPanel: AccordionItemPanel = "div",
}) => {
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
                info={{
                  caps,
                  snake,
                  writtenOut,
                }}
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
