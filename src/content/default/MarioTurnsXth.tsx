import { Card } from "../../Card";
import { ToTheLevels } from "../../ToTheLevels";
import { useTheme } from "../../theme/useTheme";

export const MarioTurnsXth = () => {
    const { info: { writtenOut, themeYear } } = useTheme();
    return (<Card illustration="home" heading={<h1>The {writtenOut}</h1>} subHeading={<h2>Mario Maker turns {themeYear}!</h2>}>
        <p>
            The anniversary project is under new management and a new banner. We publish varied and rigorously playtested levels!
        </p>
        <p>
            Every level has birthday balloons for you to discover. Can you find them all?
        </p>
        <ToTheLevels />
    </Card>)
}