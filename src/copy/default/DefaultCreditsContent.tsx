import * as React from "react";
import { Card, type CardProps } from "../../components/Card.js";
import { CreditsTrailer } from "./CreditsTrailer.js";
import { CreditsWebsite } from "./CreditsWebsite.js";

export const DefaultCreditsContent = (
  props: Omit<CardProps, "subHeading" | "heading">
) => {
  return (
    <>
      <Card
        subHeading={`Project Organization`}
        heading={`Credits`}
        {...props}
      />
      <CreditsWebsite {...props} />
      <CreditsTrailer {...props} />
    </>
  );
};
