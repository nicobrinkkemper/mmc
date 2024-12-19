import * as React from "react";
import { Ymm5ContentCreatorCard } from "./cards/Ymm5ContentCreatorCard.js";
import { Card } from "../../components/Card.js";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";
import { StayUpToDate } from "../default/StayUpToDate.js";
export const Welcome5YMM = ({ info, images, pathInfo, clickable, ...props }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { illustration: true, type: "special", heading: info?.writtenOut ?? "{writtenOut}", images: images, subHeading: `It's time to do this thing again!`, clickable: clickable, ...props },
            React.createElement("p", null, "Since the release of Mario Maker, Kiavik has hosted an annual community project in order to push Mario Maker to the limit. This year is no different, every weekend the next couple of months we'll publish a batch of varied and rigorously playtested levels."),
            React.createElement("p", null, "Every level has a birthday cake for you to discover. Can you find them all?"),
            React.createElement(ToTheLevelsStatic, { pathInfo: pathInfo, clickable: clickable })),
        React.createElement(Ymm5ContentCreatorCard, { clickable: clickable }),
        React.createElement(StayUpToDate, null)));
};
//# sourceMappingURL=Welcome.js.map