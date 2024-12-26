import * as React from "react";
import { Card } from "../../components/Card.js";

type CreditsWebsiteType = ThemeComponent<{
  clickable: true;
}>;

export const CreditsWebsite: CreditsWebsiteType = ({
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
        <dd>Wizulus</dd>
        <dd>Mr. Games All day</dd>

        <dt>UX Design</dt>
        <dd>Birdhare</dd>

        <dt>Graphics</dt>
        <dd>Lektor</dd>

        <dt>Hosting</dt>
        <dd>DuffyWeber</dd>
      </dl>
    </Card>
  );
};
