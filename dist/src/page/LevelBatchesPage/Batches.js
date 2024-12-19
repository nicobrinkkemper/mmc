import * as React from "react";
import { Card } from "../../components/Card.js";
import styles from "./Batches.module.css";
function BatchesCard({ batch, clickable, }) {
    const amountOfLevels = `${batch.levels.length} levels`;
    return (React.createElement(Card, { className: styles["BatchCard"], href: `${batch.pathInfo.to}`, clickable: clickable },
        React.createElement("span", { className: styles["BatchNumber"] }, batch.batchNumber),
        React.createElement("div", { className: styles["BatchInfo"] },
            React.createElement("span", { className: styles["BatchReleaseDay"] }, batch.releaseDate.formatted),
            React.createElement("span", { className: styles["BatchLevelAmount"] }, amountOfLevels))));
}
const createMapReleaseDays = (clickable) => function mapReleaseDays(batch) {
    return (React.createElement(BatchesCard, { key: batch.batchNumber, batch: batch, clickable: clickable }));
};
export function BatchesStatic(props) {
    if (!props.batches.length) {
        return React.createElement("div", { className: styles["Batches"] }, "No batches yet, stay tuned!");
    }
    const mapper = createMapReleaseDays(props.clickable);
    return React.createElement("div", { className: styles["Batches"] }, props.batches.map(mapper));
}
//# sourceMappingURL=Batches.js.map