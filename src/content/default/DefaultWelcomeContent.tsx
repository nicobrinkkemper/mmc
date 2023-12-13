import Button from "../../Button";
import Card from "../../Card";
import { ToTheLevels } from "../../ToTheLevels";
import { useTheme } from "../../theme/useTheme";

export const MarioTurnsXth = () => {
    const { info: { writtenOut, themeYear } } = useTheme();
    return (<>
        <h1>The {writtenOut}</h1>
        <Card illustration="card">
            <h2>Mario Maker turns {themeYear}!</h2>

            <p>
                The anniversary project is under new management and a new banner. We publish varied and rigorously playtested levels!
            </p>
            <p>
                Every level has birthday balloons for you to discover. Can you find them all?
            </p>
            <ToTheLevels />
        </Card>
    </>)
}



export const StayUpToDate = () => {
    return (<><h1>Stay up to date!</h1>
        <Card>
            <p>
                If you want to be notified when a new release drops, subscribe to our YouTube channel, where we will post a video showcasing all new levels every week!
            </p>
            <Button
                icon="play-button"
                to="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
            >
                To the videos
            </Button>
        </Card >
    </>);
}

export const DefaultWelcomeContent = () => {
    return (
        <div className="WelcomeContent">
            <MarioTurnsXth />
            <StayUpToDate />
        </div>
    );
};

