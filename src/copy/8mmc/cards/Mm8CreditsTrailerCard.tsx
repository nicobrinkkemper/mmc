import * as React from "react";
import { Card } from "../../../components/Card.js";


export const Mm8CreditsTrailerCard: CreditsTrailerCardType = (props) => (
  <Card
    heading={`Trailers`}
    subHeading={undefined}
    images={{}}
    clickable={undefined}
    {...props}
  >
    <dl>
      <dt>Script and video</dt>
      <dd>Paxsman</dd>

      <dt>Intro animation</dt>
      <dd>Lektor</dd>

      <dt>Voice</dt>
      <dd>DuffyWeber</dd>

      <dt>Music</dt>
      <dd>Qumu</dd>
    </dl>
    <p>Special thanks to Lektor Jr. (a.k.a. Liam)</p>
  </Card>
);
