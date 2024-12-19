import * as React from "react";
import { Card } from "../../components/Card.js";
import { Difficulty } from "../../components/Difficulty.js";
import { MakerName } from "../../components/MakerName.js";
import { PublicImage } from "../../components/PublicImage.js";
import { Tags } from "../../components/Tags.js";
import styles from "./Batch.module.css";
function BatchLevelCard({ level, levelIndex, clickable: Clickable, }) {
    return (React.createElement(Card, { heading: levelIndex === 0 ? level.releaseDate.formatted : undefined, key: level.levelName.slug, href: level.pathInfo.to, className: styles["Batch"], clickable: Clickable },
        React.createElement(PublicImage, { alt: level.levelName.name, ...level.images.levelThumbnail }),
        React.createElement("div", { className: styles["Info"] },
            React.createElement("h2", null, level.levelName.name),
            React.createElement(MakerName, { nationality: level.nationality, makerName: level.makerName.name }),
            React.createElement("div", { className: styles["LevelInfo"] },
                React.createElement(Tags, { tags: level.tags }),
                React.createElement(Difficulty, { ...level })))));
}
const createMapLevels = (clickable = "a") => function mapLevels(level, orderIndex) {
    return (React.createElement(BatchLevelCard, { key: level.levelName.name, level: level, levelIndex: orderIndex, clickable: clickable }));
};
export function BatchStatic({ batch, clickable, }) {
    const mapper = createMapLevels(clickable);
    return React.createElement(React.Fragment, null, batch.levels.map(mapper));
}
//# sourceMappingURL=Batch.js.map