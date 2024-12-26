import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";

export const MarioTurnsXthStatic: ThemeComponent<{
  info: pickRequired<["writtenOut", "themeYear"]>;
  images: pickOptional<["illustration"]>;
  pathInfo: required;
  clickable: required;
}> = ({ images, info, pathInfo, clickable }) => {
  return (
    <Card
      heading={`The ${info.writtenOut}`}
      subHeading={`Mario Maker turns ${info.themeYear}!`}
      images={images}
      clickable={undefined}
    >
      <p>
        The anniversary project is under new management and a new banner. We
        publish varied and rigorously playtested levels!
      </p>
      <p>
        Every level has birthday balloons for you to discover. Can you find them
        all?
      </p>
      <Button
        primary={true}
        icon="arrow-right"
        href={pathInfo.toLevels}
        clickable={clickable}
      >
        To the levels
      </Button>
    </Card>
  );
};
