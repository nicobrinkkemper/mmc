import Button from "../../components/Button";
import { Card } from "../../components/Card";

export const StayUpToDate = () => <Card heading={<h1>Stay up to date!</h1>}>
    <p>
        If you want to be notified when a new release drops, subscribe to our YouTube channel, where we will post a video showcasing all new levels every week!
    </p>
    <Button
        icon="play-button"
        to="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
    >
        To the videos
    </Button>
</Card>