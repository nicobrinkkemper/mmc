import * as React from "react";
import { Card, type CardProps } from "../../components/Card.js";

export const CreditsTrailer = (props: CardProps) => {
  return (
    <Card {...props}>
      <h2>Trailers</h2>
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
};
