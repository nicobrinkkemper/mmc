import * as React from "react";
import { Card, CardProps } from "../../../components/Card.js";

export const Ymm4CreditsTrailerCard = (props: CardProps) => {
  return (
    <Card {...props}>
      <h2>Trailers</h2>
      <dl>
        <dt>Script, visuals & edit</dt>
        <dd>Lektor</dd>

        <dt>Visual concepts</dt>
        <dd>Paxsman</dd>

        <dt>Voice & script</dt>
        <dd>DuffyWeber</dd>

        <dt>Video capture</dt>
        <dd>DanTheVP</dd>
        <dd>Paxsman</dd>

        <dt>Music</dt>
        <dd>Qumu</dd>
        <dd>T.L.B. Orchestration</dd>
      </dl>
      <p>Special thanks to Kiavik and Lektor Jr. (a.k.a. Liam)</p>
    </Card>
  );
};
