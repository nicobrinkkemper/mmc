import * as React from "react";
import { Card } from "../../../components/Card.js";

export const Mm7CreditsTrailerCard: CreditsTrailerCardType = (props) => (
  <Card
    heading={`Trailers`}
    subHeading={undefined}
    images={{}}
    clickable={undefined}
    {...props}
  >
    <dl>
      <dt>Script, visuals &amp; edit</dt>
      <dd>Lektor</dd>

      <dt>Additional visuals</dt>
      <dd>choo_choo!</dd>

      <dt>Voice</dt>
      <dd>DuffyWeber</dd>

      <dt>Music</dt>
      <dd>Qumu</dd>
    </dl>
    <p>Special thanks to Lektor Jr. (a.k.a. Liam)</p>
  </Card>
);
