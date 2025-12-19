import * as React from "react";
import { Card } from "../../../components/Card.js";

export const Mm10CreditsTrailerCard: CreditsTrailerCardType = (props) => (
  <Card
    subHeading={`Trailers`}
    clickable={undefined}
    images={{}}
    heading={undefined}
    {...props}
  >
    <dl>
      <dt>Script and video</dt>
      <dd>DuffyWeber</dd>
      <br />

      <dt>Animated visuals</dt>
      <dd>MrElectrodude</dd>
      <br />

      <dt>Voice</dt>
      <dd>DuffyWeber</dd>
      <br />

      <dt>Music</dt>
      <dd>Qumu</dd>
    </dl>
  </Card>
);
