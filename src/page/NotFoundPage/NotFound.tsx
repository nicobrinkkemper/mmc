import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";
import styles from "./NotFound.module.css";

const NotFoundStatic = ({
  error,
  pathInfo,
  clickable,
}: {
  error?: string;
  pathInfo: Pick<ThemePathInfo, "toLevels" | "to">;
} & Clickable) => {
  return (
    <>
      <Card className={styles["Card"]}>
        <p>This page was not found, sorry! Jank can happen sometimes.</p>
        {error ? <p>The error message for the web developer: {error}</p> : null}
      </Card>
      <div className={styles["Buttons"]}>
        <ToTheLevelsStatic
          pathInfo={{ toLevels: pathInfo.toLevels }}
          clickable={clickable}
        />
        <Button icon="arrow-right" href={pathInfo.to} clickable={clickable}>
          To homepage
        </Button>
      </div>
    </>
  );
};

export { NotFoundStatic };
