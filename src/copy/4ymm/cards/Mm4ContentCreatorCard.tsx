import * as React from "react";
import { Button } from "../../../components/Button.js";
import { Card } from "../../../components/Card.js";

export const MM4ContentCreatorCard: ContentCreatorCardType = ({
  clickable,
  ...props
}) => (
  <Card
    heading={`Content creator?`}
    subHeading={`We have readied a Drive folder for you.`}
    images={{}}
    clickable={undefined}
    {...props}
  >
    <p>
      Here you will find visual elements from the project: Logos, illustrations
      and other goodies. These are free to use for thumbnails, video overlays
      and other purposes.
    </p>
    <Button
      icon="folder"
      href="https://drive.google.com/drive/folders/1PS6FRuYXR0V8Bgds3oIp2_Deur70drOc"
      clickable={clickable}
    >
      Open folder
    </Button>
  </Card>
);
