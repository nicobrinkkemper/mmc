import { Card, CardProps } from "../../components/Card";
import { CreditsWebsite } from "../default/CreditsWebsite";
import { Mm9CreditsTrailerCard } from "./cards/Mm9CreditsTrailerCard";

export const Credits = (props: CardProps) => (
  <>
    <Card heading={`Credits`} subHeading={`Project Organization`} {...props}>
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
    <CreditsWebsite {...props} />
    <Mm9CreditsTrailerCard {...props} />
  </>
);
