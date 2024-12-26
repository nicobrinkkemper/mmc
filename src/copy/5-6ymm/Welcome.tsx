import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import { StayUpToDate } from "../default/StayUpToDate.js";
import { Ymm5ContentCreatorCard } from "./cards/Ymm5ContentCreatorCard.js";

type Welcome5YMMType = ThemeComponent<{
  info: pickRequired<["writtenOut"]>;
  images: pickRequired<["illustration"]>;
  pathInfo: pickRequired<["toLevels"]>;
  clickable: required;
}>;

export const Welcome5YMM: Welcome5YMMType = ({
  info,
  images,
  pathInfo,
  clickable,
  ...props
}) => {
  return (
    <>
      <Card
        type={"special"}
        heading={info.writtenOut}
        images={images}
        subHeading={`It's time to do this thing again!`}
        clickable={clickable}
        {...props}
      >
        <p>
          Since the release of Mario Maker, Kiavik has hosted an annual
          community project in order to push Mario Maker to the limit. This year
          is no different, every weekend the next couple of months we'll publish
          a batch of varied and rigorously playtested levels.
        </p>
        <p>
          Every level has a birthday cake for you to discover. Can you find them
          all?
        </p>
        <Button
          icon="arrow-right"
          href={pathInfo.toLevels}
          clickable={clickable}
        >
          To the levels
        </Button>
      </Card>
      <Ymm5ContentCreatorCard clickable={clickable} />
      <StayUpToDate clickable={clickable} />
    </>
  );
};
