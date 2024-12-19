import * as React from "react";
import { Card, CardProps } from "../../components/Card.js";
import { CreditsWebsite } from "../default/CreditsWebsite.js";
import { Ymm4CreditsTrailerCard } from "./cards/Ymm4CreditsTrailersCard.js";

export const Credits4YMM = (
  props: Omit<CardProps, "subHeading" | "subHeading" | "children">
) => (
  <>
    <Card heading={`Credits`} subHeading={`Project Organization`} {...props}>
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
    <CreditsWebsite {...props} />
    <Ymm4CreditsTrailerCard {...props} />
  </>
);
