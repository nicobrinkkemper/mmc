import { Card } from "../../components/Card";
import { ToTheLevels } from "../../components/ToTheLevels";
import { useTheme } from "../../theme/useTheme";

export const MarioTurnsXth = () => {
    const { info: { writtenOut, themeYear } } = useTheme();
    return (
      <Card
        illustration
        heading={`The ${writtenOut}`}
        subHeading={`Mario Maker turns ${themeYear}!`}
      >
        <p>
          The anniversary project is under new management and a new banner. We
          publish varied and rigorously playtested levels!
        </p>
        <p>
          Every level has birthday balloons for you to discover. Can you find
          them all?
        </p>
        <ToTheLevels />
      </Card>
    );
}