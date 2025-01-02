import classNames from "classnames";
import * as React from "react";
import { default as classes } from "./About.module.css";
import { CloseSvg } from "./CloseSvg.js";

type AboutType = ThemeComponent<
  {
    clickable: true;
  },
  "div",
  {
    closeProps: React.JSX.IntrinsicElements["a"];
    visible: boolean;
  }
>;

export const About: AboutType = ({
  closeProps,
  children,
  visible,
  clickable: Clickable,
}) => {
  return (
    <div
      className={classNames(classes["outer"], visible && classes["visible"])}
      id={"!/about"}
    >
      <div className={classes["main"]}>
        <div className={classes["inner"]}>
          <div className={classes["header"]}>
            <Clickable
              className={classNames(classes["close"], closeProps?.className)}
              {...closeProps}
            >
              <CloseSvg />
            </Clickable>
          </div>
          <div className={classes["body"]}>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
