import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import styles from "./NotFound.module.css";

const NotFoundStatic: ThemePageComponent<
  `/${MainTheme}`,
  {
    pathInfo: required;
    clickable: required;
  }
> = ({ pathInfo, clickable }) => {
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
          href={pathInfo.toLevels}
          clickable={clickable}
        >
          To the levels
        </Button>
        <Button icon="arrow-right" href={pathInfo.toHome} clickable={clickable}>
          To homepage
        </Button>
      </div>
    </>
  );
};

export { NotFoundStatic };
