import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import { StayUpToDate } from "../default/StayUpToDate.js";
import { MM4ContentCreatorCard } from "./cards/Mm4ContentCreatorCard.js";

export const Welcome4YMM: ThemeComponent<
  {
    info: pickRequired<["writtenOut"]>;
    pathInfo: true;
    clickable: true;
    images: pickOptional<["illustration"]>;
  },
  "div"
> = ({ info, pathInfo, clickable, ...props }) => {
  return (
    <>
      <Card
        type={"special"}
        heading={info.writtenOut}
        subHeading={`Come join us celebrate the anniversary of Super Mario Maker 2!`}
        {...props}
        clickable={undefined}
      >
        <p>
          Again, Kiavik has recruited a top notch team for this annual
          get-together, and this will be the best level pack yet!
        </p>
        <p>
          For months, these levels have gone through strict auditions and
          rigorous playtesting to ensure you will have the best experience
          possible.
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
      <MM4ContentCreatorCard clickable={clickable} />
      <StayUpToDate clickable={clickable} />
    </>
  );
};
