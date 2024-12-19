import * as React from "react";
import { Card } from "../../components/Card.js";
export const CreditsWebsite = (props) => {
    return (React.createElement(Card, { subHeading: `Website`, ...props },
        React.createElement("dl", null,
            React.createElement("dt", null, "Web Developer"),
            React.createElement("dd", null,
                React.createElement("a", { href: "https://x.com/bbmariomaker2", target: "_BLANK", rel: "noreferrer", className: "highlight" }, "General BB / Geitje")),
            React.createElement("dd", null, "Wizulus"),
            React.createElement("dd", null, "Mr. Games All day"),
            React.createElement("dt", null, "UX Design"),
            React.createElement("dd", null, "Birdhare"),
            React.createElement("dt", null, "Graphics"),
            React.createElement("dd", null, "Lektor"),
            React.createElement("dt", null, "Hosting"),
            React.createElement("dd", null, "DuffyWeber"))));
};
//# sourceMappingURL=CreditsWebsite.js.map