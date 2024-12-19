import * as React from "react";
import { Card, CardProps } from "../../components/Card.js";
import { CreditsWebsite } from "../default/CreditsWebsite.js";
import { Ymm5CreditsTrailerCard } from "./cards/Ymm5CreditsTrailerCard.js";

export const Credits5YMM = ({ children, ...props }: CardProps) => (
  <>
    <Card heading={`Credits`} subHeading={`Project Organization`} {...props}>
      <dl>
        <dt>Project manager</dt>
        <dd>Kiavik</dd>

        <dt>Coordinators</dt>
        <dd>Bossman</dd>
        <dd>DTSpies</dd>
        <dd>Donkeymint</dd>
        <dd>Four Wings</dd>
        <dd>Lektor</dd>
        <dd>Mini Barf</dd>

        <dt>{`Cheese master (QA)`}</dt>
        <dd>Zurfink</dd>

        <dt>Lead playtesters</dt>
        <dd>Mang</dd>
        <dd>Salt Lake</dd>
      </dl>
    </Card>
    <CreditsWebsite {...props} />
    <Ymm5CreditsTrailerCard {...props} />
  </>
);
