import * as React from "react";

import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import { StayUpToDate } from "../default/StayUpToDate.js";

type Welcome9MMCType = ThemeComponent<{
  info: pickRequired<["writtenOut", "themeYear"]>;
  images: pickRequired<["illustration"]>;
  pathInfo: pickRequired<["toLevels"]>;
  clickable: required;
}>;

export const Welcome9MMC: Welcome9MMCType = ({
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
          Hello Makers! The anniversary project has passed to new hands yet
          again but the party is just getting started! This year we have a
          special treat in the form of a symphony on top of all the great levels
          you're used to, orchestrated by Bowser and performed by some of the
          most talented music makers across the Mario Maker community. We hope
          you enjoy the celebration and we look forward to seeing you next year!
        </p>
        <p>
          Every level has birthday balloons for you to discover. Can you find
          them all? Hmm yes, ass
          <br />
          <br />
          As a special gift this Christmas, here's Duffy's maker code! Be sure
          to leave them nice comments for all they've done for the project!
          <br />- 9KX-PDY-61G
        </p>
        <Button icon="arrow-right" href={toLevels} clickable={clickable}>
          To the levels
        </Button>
      </Card>
      <StayUpToDate clickable={clickable} />
    </>
  );
};
