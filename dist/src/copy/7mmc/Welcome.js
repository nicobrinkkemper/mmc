import * as React from "react";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";
import { Mm7ArtWorkCard } from "./cards/Mm7ArtworkCard.js";
import { MM7ContentCreatorCard } from "./cards/Mm7ContentCreatorCard.js";
import { Card } from "../../components/Card.js";
import { StayUpToDate } from "../default/StayUpToDate.js";
export const Welcome7MMC = ({ info, pathInfo, images, clickable, }) => {
    const { writtenOut, themeYear } = info;
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { illustration: true, heading: writtenOut, subHeading: `Mario Maker turns ${themeYear}!`, images: images },
            React.createElement("p", null, "The anniversary project is under new management and a new banner, but you'll still see many familiar names crop up along with new ones as we celebrate another year of Mario Maker. Every weekend across the next couple of months we'll publish a batch of varied and rigorously playtested levels!"),
            React.createElement("p", null, "Every level has birthday balloons for you to discover. Can you find them all?"),
            React.createElement(ToTheLevelsStatic, { pathInfo: pathInfo, clickable: clickable })),
        React.createElement(MM7ContentCreatorCard, { clickable: clickable }),
        React.createElement(StayUpToDate, null),
        React.createElement(Mm7ArtWorkCard, { clickable: clickable })));
};
//# sourceMappingURL=Welcome.js.map