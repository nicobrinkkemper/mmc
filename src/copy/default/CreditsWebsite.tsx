import { Card } from "../../components/Card";

export const CreditsWebsite = (props: React.ComponentProps<typeof Card>) => {
  return (
    <Card subHeading={`Website`} {...props}>
      <dl>
        <dt>Web Developer</dt>
        <dd>
          <a
            href="https://twitter.com/bbmariomaker2"
            target="_BLANK"
            rel="noreferrer"
            className="highlight"
          >
            General BB / Geitje
          </a>
        </dd>

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
