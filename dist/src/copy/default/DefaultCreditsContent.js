import * as React from "react";
import { Card } from "../../components/Card.js";
import { CreditsTrailer } from "./CreditsTrailer.js";
import { CreditsWebsite } from "./CreditsWebsite.js";
export const DefaultCreditsContent = (props) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { subHeading: `Project Organization`, heading: `Credits`, ...props }),
        React.createElement(CreditsWebsite, { ...props }),
        React.createElement(CreditsTrailer, { ...props })));
};
//# sourceMappingURL=DefaultCreditsContent.js.map