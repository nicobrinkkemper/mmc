import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
export const StayUpToDate = ({ clickable = "a", ...props }) => (React.createElement(Card, { heading: `Stay up to date!`, ...props },
    React.createElement("p", null, "If you want to be notified when a new release drops, subscribe to our YouTube channel, where we will post a video showcasing all new levels every week!"),
    React.createElement(Button, { icon: "play-button", href: "https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ", clickable: clickable }, "To the videos")));
//# sourceMappingURL=StayUpToDate.js.map