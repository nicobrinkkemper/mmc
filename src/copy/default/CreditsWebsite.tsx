import * as React from "react";
import { Card } from "../../components/Card.js";


export const CreditsWebsite: CreditsWebsiteCardType = ({
  clickable: Clickable,
  ...props
}) => {
  return (
    <Card
      subHeading={`Website`}
      clickable={undefined}
      images={{}}
      heading={undefined}
      {...props}
    >
      <dl>
        <dt>Web Developer</dt>
        <dd>
          <Clickable
            href="https://x.com/bbmariomaker2"
            target="_BLANK"
            rel="noreferrer"
            className="highlight"
          >
            General BB / Geitje
          </Clickable>
        </dd>
        <dd>MrElectrodude</dd>
        <dd>Wizulus</dd>
        <dd>Mr. Games All day</dd>
        <br/>

        <dt>UX Design</dt>
        <dd>Birdhare</dd>
        <br/>

        <dt>Graphics</dt>
        <dd>Lektor</dd>
        <dd>MrElectrodude</dd>
        <br/>

        <dt>Hosting</dt>
        <dd>DuffyWeber</dd>
      </dl>
      <dl>
        <dt>Open Source</dt>
        <dd>
          <Clickable
            href="https://github.com/nicobrinkkemper/mmc"
            target="_BLANK"
            rel="noreferrer"
            className="highlight"
          >
            Github
          </Clickable>
        </dd>
        <dd>
          <Clickable
            href="https://nicobrinkkemper.github.io/mmc/"
            target="_BLANK"
            rel="noreferrer"
            className="highlight"
          >
            GitHub Pages mirror
          </Clickable>
        </dd>
      </dl>
    </Card>
  );
};
