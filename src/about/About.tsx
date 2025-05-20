import classNames from "clsx";
import * as React from "react";
import styles from "./About.module.css";
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
      className={classNames(styles["outer"], visible && styles["visible"])}
      id={"!/about"}
    >
      <div className={styles["main"]}>
        <div className={styles["inner"]}>
          <div className={styles["header"]}>
            <Clickable
              className={classNames(styles["close"], closeProps?.className)}
              {...closeProps}
            >
              <CloseSvg />
            </Clickable>
          </div>
          <div className={styles["body"]}>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
