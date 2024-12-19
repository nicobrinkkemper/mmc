import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsWebsite } from "../default/CreditsWebsite.js";
import { Ymm4CreditsTrailerCard } from "./cards/Ymm4CreditsTrailersCard.js";
export const Credits4YMM = (props) => (React.createElement(React.Fragment, null,
    React.createElement(Card, { heading: `Credits`, subHeading: `Project Organization`, ...props },
        React.createElement("dl", null,
            React.createElement("dt", null, "Project manager"),
            React.createElement("dd", null, "Kiavik"),
            React.createElement("dt", null, "Coordinators"),
            React.createElement("dd", null, "Bossman"),
            React.createElement("dd", null, "Buflen"),
            React.createElement("dd", null, "CTRX"),
            React.createElement("dd", null, "DanTheVP"),
            React.createElement("dd", null, "DavidPinkston"),
            React.createElement("dd", null, "DTSpies"),
            React.createElement("dd", null, "Donkeymint"),
            React.createElement("dd", null, "Four Wings"),
            React.createElement("dd", null, "Julian"))),
    React.createElement(CreditsWebsite, { ...props }),
    React.createElement(Ymm4CreditsTrailerCard, { ...props })));
//# sourceMappingURL=Credits.js.map