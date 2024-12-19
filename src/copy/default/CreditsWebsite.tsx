import * as React from "react";
import { Card, CardProps } from "../../components/Card.js";

export const CreditsWebsite = (
  props: Omit<CardProps, "subHeading" | "children">
) => {
  return (
    <Card subHeading={`Website`} {...props}>
      <dl>
        <dt>Web Developer</dt>
        <dd>
          <a
            href="https://x.com/bbmariomaker2"
            target="_BLANK"
            rel="noreferrer"
            className="highlight"
          >
            General BB / Geitje
          </a>
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
