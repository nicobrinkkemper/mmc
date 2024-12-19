import * as React from "react";
import { Button } from "../../../components/Button.js";
import { Card } from "../../../components/Card.js";

export const Ymm5ContentCreatorCard = ({ clickable }: Clickable) => (
  <Card
    heading={`Content creator?`}
    subHeading={`We have readied a Drive folder for you.`}
  >
    <p>
      Here you will find visual elements from the project: Logos, illustrations
      and other goodies. These are free to use for thumbnails, video overlays
      and other purposes.
    </p>
    <Button
      icon="folder"
      href="https://drive.google.com/drive/folders/1XyDe_a-6EtSVUvS4Clk0V5oK5PXg6q8i"
      clickable={clickable}
    >
      Open folder
    </Button>
  </Card>
);
