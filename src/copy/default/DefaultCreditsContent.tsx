import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsTrailer } from "./CreditsTrailer.js";
import { CreditsWebsite } from "./CreditsWebsite.js";


export const DefaultCreditsContent: CreditsContentCardType = ({
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
      <CreditsTrailer />
    </>
  );
};
