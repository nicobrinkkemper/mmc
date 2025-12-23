import * as React from "react";

import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import { StayUpToDate } from "../default/StayUpToDate.js";

type Welcome10MMCType = ThemeComponent<{
  info: pickRequired<["writtenOut", "themeYear"]>;
  images: pickRequired<["illustration"]>;
  pathInfo: pickRequired<["toLevels"]>;
  clickable: required;
}>;

export const Welcome10MMC: Welcome10MMCType = ({
  info: { writtenOut, themeYear },
  images: { illustration },
  pathInfo: { toLevels },
  clickable,
  ...props
}) => {
  return (
    <>
      <Card
        heading={`The ${writtenOut}`}
        subHeading={`Mario Maker turns ${themeYear}!`}
        images={{ illustration }}
        clickable={undefined}
        {...props}
      >
        <p style={{ marginBottom: "1rem" }}>
          Hi all! We have made it to the big number. Thank you for coming along with us this far!
          This year, we have a brand-new set of levels for you to discover. We hope you enjoy them!

          So, join us and see where the rainbow road takes us!
        </p>
        <p>
          Every level has birthday balloons for you to discover. Can you find
          them all?
          <br />
          <br />
          Just like last year, here's Duffy's maker code :)
          <br />- 9KX-PDY-61G
          <br />
          <br />
        </p>
        <Button icon="arrow-right" href={toLevels} clickable={clickable}>
          To the levels
        </Button>
      </Card>
      <StayUpToDate clickable={clickable} />
    </>
  );
};
