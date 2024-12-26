import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsTrailer } from "./CreditsTrailer.js";
import { CreditsWebsite } from "./CreditsWebsite.js";

type CreditsContentType = ThemeComponent<{
  clickable: true;
}>;

export const DefaultCreditsContent: CreditsContentType = ({
  clickable,
  ...props
}) => {
  return (
    <>
      <Card
        subHeading={`Project Organization`}
        heading={`Credits`}
        images={{}}
        clickable={undefined}
        {...props}
      />
      <CreditsWebsite clickable={clickable} />
      <CreditsTrailer clickable={clickable} />
    </>
  );
};
