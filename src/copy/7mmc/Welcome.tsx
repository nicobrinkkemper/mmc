import * as React from "react";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";
import { Mm7ArtWorkCard } from "./cards/Mm7ArtworkCard.js";
import { MM7ContentCreatorCard } from "./cards/Mm7ContentCreatorCard.js";

import { Card } from "../../components/Card.js";
import { StayUpToDate } from "../default/StayUpToDate.js";

export const Welcome7MMC = ({
  info,
  pathInfo,
  images,
  clickable,
}: MarioTurnsXthStaticProps) => {
  const { writtenOut, themeYear } = info;
  return (
    <>
      <Card
        illustration
        heading={writtenOut}
        subHeading={`Mario Maker turns ${themeYear}!`}
        images={images}
      >
        <p>
          The anniversary project is under new management and a new banner, but
          you'll still see many familiar names crop up along with new ones as we
          celebrate another year of Mario Maker. Every weekend across the next
          couple of months we'll publish a batch of varied and rigorously
          playtested levels!
        </p>
        <p>
          Every level has birthday balloons for you to discover. Can you find
          them all?
        </p>
        <ToTheLevelsStatic pathInfo={pathInfo} clickable={clickable} />
      </Card>
      <MM7ContentCreatorCard clickable={clickable} />
      <StayUpToDate />
      <Mm7ArtWorkCard clickable={clickable} />
    </>
  );
};
