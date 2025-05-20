import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsWebsite } from "../default/CreditsWebsite.js";
import { Ymm4CreditsTrailerCard } from "./cards/Ymm4CreditsTrailersCard.js";

export const Credits4YMM: CreditsContentCardType = ({
  clickable,
  ...props
}) => (
  <>
    <Card
      heading={`Credits`}
      subHeading={`Project Organization`}
      images={{}}
      clickable={undefined}
      {...props}
    >
      <dl>
        <dt>Project manager</dt>
        <dd>Kiavik</dd>

        <dt>Coordinators</dt>
        <dd>Bossman</dd>
        <dd>Buflen</dd>
        <dd>CTRX</dd>
        <dd>DanTheVP</dd>
        <dd>DavidPinkston</dd>
        <dd>DTSpies</dd>
        <dd>Donkeymint</dd>
        <dd>Four Wings</dd>
        <dd>Julian</dd>
      </dl>
    </Card>
    <CreditsWebsite clickable={clickable} />
    <Ymm4CreditsTrailerCard />
  </>
);
