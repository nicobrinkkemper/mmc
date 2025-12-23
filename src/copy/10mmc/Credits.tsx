import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsWebsite } from "../default/CreditsWebsite.js";
import { Mm10CreditsTrailerCard } from "./cards/Mm10CreditsTrailerCard.js";

export const Credits10MMC: CreditsContentCardType = ({
  clickable,
  ...props
}) => (
  <>
    <Card
      heading={`Credits`}
      subHeading={`Project Organization`}
      clickable={undefined}
      images={{}}
      {...props}
    >
      <dl>
        <dt>Executive Producer</dt>
        <dd>MrElectrodude</dd>

        <dt>Judges</dt>
        <dd>Shearwater</dd>
        <dd>Sacha</dd>
        <dd>Zach Divine</dd>
        <dd>Barnstorm</dd>
        <dd>MrElectrodude</dd>

        <dt>Visual profile/marketing</dt>
        <dd>Duffy, MrElectrodude</dd>
      </dl>
    </Card>
    <CreditsWebsite clickable={clickable} className={props.className} />
    <Mm10CreditsTrailerCard className={props.className} />
  </>
);
