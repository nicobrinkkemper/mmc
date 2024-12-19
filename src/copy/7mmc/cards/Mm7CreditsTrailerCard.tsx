import * as React from "react";
import { Card, CardProps } from "../../../components/Card.js";

export const Mm7CreditsTrailerCard = (
  props: Omit<CardProps, "subHeading" | "children">
) => (
  <Card subHeading={`Trailers`} {...props}>
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
