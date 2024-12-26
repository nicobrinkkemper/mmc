import * as React from "react";
import { Card } from "../../../components/Card.js";

type Ymm5CreditsTrailerCardType = ThemeComponent<{}>;

export const Ymm5CreditsTrailerCard: Ymm5CreditsTrailerCardType = (props) => {
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
