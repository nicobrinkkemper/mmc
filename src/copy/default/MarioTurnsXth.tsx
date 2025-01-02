import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";

export const MarioTurnsXth: MarioTurnsXthType = ({
  images,
  info: { writtenOut, themeYear },
  pathInfo: { toLevels },
  clickable,
}) => {
  return (
    <Card
      heading={`The ${writtenOut}`}
      subHeading={`Mario Maker turns ${themeYear}!`}
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
        href={toLevels}
        clickable={clickable}
      >
        To the levels
      </Button>
    </Card>
  );
};
