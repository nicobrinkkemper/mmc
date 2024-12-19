import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsWebsite } from "../default/CreditsWebsite.js";
import { Ymm5CreditsTrailerCard } from "./cards/Ymm5CreditsTrailerCard.js";
export const Credits5YMM = ({ children, ...props }) => (React.createElement(React.Fragment, null,
    React.createElement(Card, { heading: `Credits`, subHeading: `Project Organization`, ...props },
        React.createElement("dl", null,
            React.createElement("dt", null, "Project manager"),
            React.createElement("dd", null, "Kiavik"),
            React.createElement("dt", null, "Coordinators"),
            React.createElement("dd", null, "Bossman"),
            React.createElement("dd", null, "DTSpies"),
            React.createElement("dd", null, "Donkeymint"),
            React.createElement("dd", null, "Four Wings"),
            React.createElement("dd", null, "Lektor"),
            React.createElement("dd", null, "Mini Barf"),
            React.createElement("dt", null, `Cheese master (QA)`),
            React.createElement("dd", null, "Zurfink"),
            React.createElement("dt", null, "Lead playtesters"),
            React.createElement("dd", null, "Mang"),
            React.createElement("dd", null, "Salt Lake"))),
    React.createElement(CreditsWebsite, { ...props }),
    React.createElement(Ymm5CreditsTrailerCard, { ...props })));
//# sourceMappingURL=Credits.js.map