import * as React from "react";
import { Mm7ArtWorkCard } from "./cards/Mm7ArtworkCard.js";
import { MM7ContentCreatorCard } from "./cards/Mm7ContentCreatorCard.js";

import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import { StayUpToDate } from "../default/StayUpToDate.js";

type Welcome7MMCType = ThemeComponent<{
  info: pickRequired<["writtenOut", "themeYear"]>;
  images: pickOptional<["illustration"]>;
  pathInfo: required;
  clickable: required;
}>;

export const Welcome7MMC: Welcome7MMCType = ({
  info,
  pathInfo,
  images,
  clickable,
  ...props
}) => {
  return (
    <>
      <Card
        heading={info.writtenOut}
        subHeading={`Mario Maker turns ${info.themeYear}!`}
        images={images}
        clickable={undefined}
        {...props}
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
        <Button
          primary={true}
          icon="arrow-right"
          href={pathInfo.toLevels}
          clickable={clickable}
        >
          To the levels
        </Button>
      </Card>
      <MM7ContentCreatorCard clickable={clickable} />
      <StayUpToDate clickable={clickable} />
      <Mm7ArtWorkCard clickable={clickable} />
    </>
  );
};
