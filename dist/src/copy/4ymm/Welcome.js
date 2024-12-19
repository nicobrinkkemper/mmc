import * as React from "react";
import { Card } from "../../components/Card.js";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";
import { StayUpToDate } from "../default/StayUpToDate.js";
import { MM4ContentCreatorCard } from "./cards/Mm4ContentCreatorCard.js";
export const Welcome4YMM = ({ info, pathInfo, clickable: Clickable = "a", ...props }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { illustration: true, type: "special", heading: info?.writtenOut ?? "{writtenOut}", subHeading: `Come join us celebrate the anniversary of Super Mario Maker 2!`, ...props },
            React.createElement("p", null, "Again, Kiavik has recruited a top notch team for this annual get-together, and this will be the best level pack yet!"),
            React.createElement("p", null, "For months, these levels have gone through strict auditions and rigorous playtesting to ensure you will have the best experience possible."),
            React.createElement("p", null, "Every level has a birthday cake for you to discover. Can you find them all?"),
            React.createElement(ToTheLevelsStatic, { pathInfo: pathInfo, clickable: Clickable })),
        React.createElement(MM4ContentCreatorCard, { clickable: Clickable }),
        React.createElement(StayUpToDate, null)));
};
//# sourceMappingURL=Welcome.js.map