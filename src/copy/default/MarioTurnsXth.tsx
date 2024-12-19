import * as React from "react";
import { Card } from "../../components/Card.js";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";

export const MarioTurnsXthStatic = ({
  images,
  info,
  pathInfo,
  clickable,
}: MarioTurnsXthStaticProps) => {
  return (
    <Card
      illustration
      heading={`The ${info?.writtenOut ?? "{writtenOut}"}`}
      subHeading={`Mario Maker turns ${info?.themeYear ?? "{themeYear}"}!`}
      images={images}
    >
      <p>
        The anniversary project is under new management and a new banner. We
        publish varied and rigorously playtested levels!
      </p>
      <p>
        Every level has birthday balloons for you to discover. Can you find them
        all?
      </p>
      <ToTheLevelsStatic pathInfo={pathInfo} clickable={clickable} />
    </Card>
  );
};
