import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import styles from "./NotFound.module.css";

type NotFoundType = ThemeComponent<{
  pathInfo: ["toHome", "toLevels"];
  clickable: true;
}>;

export const NotFound: NotFoundType = ({
  pathInfo: { toHome, toLevels },
  clickable,
}) => {
  return (
    <>
      <Card
        className={styles["Card"]}
        clickable={clickable}
        heading="404 - Not Found!"
        subHeading={undefined}
        images={{}}
      >
        <p>This page was not found, sorry! Jank can happen sometimes.</p>
      </Card>
      <div className={styles["Buttons"]}>
        <Button
          primary={true}
          icon="arrow-right"
          href={toLevels}
          clickable={clickable}
        >
          To the levels
        </Button>
        <Button icon="arrow-right" href={toHome} clickable={clickable}>
          To homepage
        </Button>
      </div>
    </>
  );
};
