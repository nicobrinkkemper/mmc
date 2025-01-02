import * as React from "react";
import { Card } from "../../../components/Card.js";

export const Ymm4CreditsTrailerCard: CreditsTrailerCardType = (props) => {
  return (
    <Card
      heading={`Trailers`}
      subHeading={undefined}
      images={{}}
      clickable={undefined}
      {...props}
    >
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
