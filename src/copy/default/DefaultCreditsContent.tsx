import { Card, CardProps } from "../../components/Card";
import { CreditsTrailer } from "./CreditsTrailer";
import { CreditsWebsite } from "./CreditsWebsite";

export const DefaultCreditsContent = (props: CardProps) => {
  return (
    <>
      <Card
        subHeading={`Project Organization`}
        heading={`Credits`}
        {...props}
      />
      <CreditsWebsite {...props} />
      <CreditsTrailer {...props} />
    </>
  );
};
