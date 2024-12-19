import * as React from "react";
import { Card, CardProps } from "../../../components/Card.js";

export const Ymm5CreditsTrailerCard = (
  props: Omit<CardProps, "subHeading" | "children">
) => {
  return (
    <Card subHeading={`Trailers`} {...props}>
      <dl>
        <dt>Script, visuals & edit</dt>
        <dd>Lektor</dd>

        <dt>Voice & script</dt>
        <dd>DuffyWeber</dd>

        <dt>Video capture</dt>
        <dd>DTSpies</dd>
        <dd>Kiavik</dd>

        <dt>Stills capture & cool ideas</dt>
        <dd>Paxsman</dd>

        <dt>Music</dt>
        <dd>Qumu</dd>
      </dl>
      <p>{`Special thanks to Kiavik and Lektor Jr. (a.k.a. Liam)`}</p>
    </Card>
  );
};
