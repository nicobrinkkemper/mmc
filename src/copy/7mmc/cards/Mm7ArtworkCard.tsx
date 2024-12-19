import * as React from "react";
import { Button } from "../../../components/Button.js";
import { Card, CardProps } from "../../../components/Card.js";

export const Mm7ArtWorkCard = ({
  clickable,
  ...props
}: Omit<CardProps, "heading" | "children"> & Clickable) => (
  <Card heading={`Community Artwork Gallery`} {...props}>
    <p>
      Our amazing community supplied much of the art for the trailers. Click
      here to see your favorites in full detail! Forgive the dust - Page is a
      work in progress.
    </p>
    <Button
      icon="arrow-right"
      href="https://mmcelebration.com/mmc/7mmc_gallery/"
      clickable={clickable}
    >
      To the Gallery
    </Button>
  </Card>
);
