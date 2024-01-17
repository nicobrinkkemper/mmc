import { Card } from "../../components/Card";
import { ToTheLevels } from "../../components/ToTheLevels";
import { StayUpToDate } from "../default/StayUpToDate";
import { Mm7ArtWorkCard } from "./cards/Mm7ArtworkCard";
import { MM7ContentCreatorCard } from "./cards/Mm7ContentCreatorCard";


export const Welcome = () => (
  <>
    <Card
      illustration
      heading={`The seventh yearly Mario Maker celebration`}
      subHeading={`Mario Maker turns seven!`}
    >
      <p>
        The anniversary project is under new management and a new banner, but
        you'll still see many familiar names crop up along with new ones as we
        celebrate another year of Mario Maker. Every weekend across the next
        couple of months we'll publish a batch of varied and rigorously
        playtested levels!
      </p>
      <p>
        Every level has birthday balloons for you to discover. Can you find them
        all?
      </p>
      <ToTheLevels />
    </Card>
    <MM7ContentCreatorCard />
    <StayUpToDate />
    <Mm7ArtWorkCard />
  </>
);
