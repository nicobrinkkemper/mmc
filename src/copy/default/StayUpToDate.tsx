import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";

export const StayUpToDate: StayUpToDateCardType = ({ clickable, ...props }) => (
  <Card
    heading={`Stay up to date!`}
    subHeading={undefined}
    clickable={undefined}
    images={{}}
    {...props}
  >
    <p>
      If you want to be notified when a new release drops, subscribe to our
      YouTube channel, where we will post a video showcasing all new levels
      every week!
      <br />
      <br />
    </p>
    <Button
      icon="play-button"
      href="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
      clickable={clickable}
    >
      To the videos
    </Button>
  </Card>
);
