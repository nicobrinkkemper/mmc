import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsWebsite } from "../default/CreditsWebsite.js";
import { Mm9CreditsTrailerCard } from "./cards/Mm9CreditsTrailerCard.js";

type Credits9MMCType = ThemeComponent<{
  clickable: true;
}>;

export const Credits9MMC: Credits9MMCType = ({ clickable, ...props }) => (
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
        <dd>Wizulus Redikulus</dd>

        <dt>Judges</dt>
        <dd>Barnstorm</dd>
        <dd>jneen</dd>
        <dd>MrElectroDude</dd>
        <dd>Rubenscube</dd>
        <dd>Wsacha</dd>
        <dd>SevenSilhouette</dd>

        <dt>Visual profile/marketing</dt>
        <dd>Duffy, Wizulus, TripDraws</dd>
      </dl>
    </Card>
    <CreditsWebsite clickable={clickable} />
    <Mm9CreditsTrailerCard />
  </>
);
