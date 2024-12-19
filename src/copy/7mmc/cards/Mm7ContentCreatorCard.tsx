import * as React from "react";
import { Button } from "../../../components/Button.js";
import { Card, CardProps } from "../../../components/Card.js";

export const MM7ContentCreatorCard = ({
  clickable,
  ...props
}: Omit<CardProps, "heading" | "subHeading" | "children"> & Clickable) => (
  <Card
    heading={`Content creator?`}
    subHeading={`If you are a streamer, a YouTuber, a video game writer or in any other way a content creator, we have readied a Drive folder for you.`}
    {...props}
  >
    <p>
      Here you will find visual elements from the project: Logos, illustrations
      and other goodies. These are free to use for thumbnails, video overlays
      and other purposes. New elements will be released every week, so if you
      bookmark the folder you{"\u2019"}ll have access to these as soon as they
      are made available.
    </p>
    <Button
      icon="folder"
      href="https://drive.google.com/drive/folders/1dJDQQCn7_Xx0xyI-JoR01dQTH62MlFa0"
      clickable={clickable}
    >
      Open folder
    </Button>
  </Card>
);
