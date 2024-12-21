import { Card } from "../../components/Card";
import { ToTheLevels } from "../../components/ToTheLevels";
import { useTheme } from "../../theme/useTheme";
import { StayUpToDate } from "../default/StayUpToDate";

export const Welcome = () => {
  const { info: { writtenOut, themeYear } } = useTheme();
  return (<>
    <Card
      illustration
      heading={`The ${writtenOut}`}
      subHeading={`Mario Maker turns ${themeYear}!`}
    >
      <p style={{ marginBottom: "1rem" }}>
        Hello Makers! The anniversary project has passed to new hands yet again but the party is just getting started! This year we have a special treat in the form of a symphony on top of all the great levels you're used to, orchestrated by Bowser and performed
        by some of the most talented music makers across the Mario Maker community. We hope you enjoy the celebration and we look forward to seeing you next year!
      </p>
      <p>
        Every level has birthday balloons for you to discover. Can you find
        them all?<br /><br />
        As a special gift this Christmas, here's Duffy's maker code! Be sure to leave them nice comments for all they've done for the project!<br />
        - 9KX-PDY-61G
      </p>
      <ToTheLevels />
    </Card>
    <StayUpToDate />
  </>)
}

