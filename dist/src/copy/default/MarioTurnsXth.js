import * as React from "react";
import { Card } from "../../components/Card.js";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";
export const MarioTurnsXthStatic = ({ images, info, pathInfo, clickable, }) => {
    return (React.createElement(Card, { illustration: true, heading: `The ${info?.writtenOut ?? "{writtenOut}"}`, subHeading: `Mario Maker turns ${info?.themeYear ?? "{themeYear}"}!`, images: images },
        React.createElement("p", null, "The anniversary project is under new management and a new banner. We publish varied and rigorously playtested levels!"),
        React.createElement("p", null, "Every level has birthday balloons for you to discover. Can you find them all?"),
        React.createElement(ToTheLevelsStatic, { pathInfo: pathInfo, clickable: clickable })));
};
//# sourceMappingURL=MarioTurnsXth.js.map