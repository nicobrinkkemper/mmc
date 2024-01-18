import Button from "../../../components/Button";
import { Card } from "../../../components/Card";

export const Mm7ArtWorkCard = () => (
  <Card heading={`Community Artwork Gallery`}>
    <p>
      Our amazing community supplied much of the art for the trailers. Click
      here to see your favorites in full detail! Forgive the dust - Page is a
      work in progress.
    </p>
    <Button icon="arrow-right" to="https://mmcelebration.com/mmc/7mmc_gallery/">
      To the Gallery
    </Button>
  </Card>
);