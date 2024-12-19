import * as React from "react";
import { CompileJSX } from "../../CompileJSX.js";
import { Card } from "../../components/Card.js";
import { Difficulty } from "../../components/Difficulty.js";
import { PublicImage } from "../../components/PublicImage.js";
import { Tags } from "../../components/Tags.js";
import styles from "./LevelCard.module.css";
export function LevelCard({ level }) {
    return (React.createElement(Card, { className: styles["LevelCard"] },
        React.createElement("div", { style: {
                maxWidth: level.images.level.width + "px",
                justifySelf: "center",
            } },
            React.createElement("h2", null, level.levelName.name),
            React.createElement(PublicImage, { alt: `Screenshot: ${level.makerName.name}`, src: level.images.level.src, srcSet: level.images.level.srcSet, width: level.images.level.width, height: level.images.level.height, className: styles["LevelImage"] }),
            React.createElement("h3", { className: styles["LevelCode"] }, level.levelCode ?? "Code coming soon")),
        React.createElement("div", { className: styles["TagsAndDifficulty"] },
            React.createElement(Tags, { tags: level.tags }),
            React.createElement(Difficulty, { difficulty: level.difficulty, difficultyName: level.difficultyName })),
        React.createElement("div", { className: styles["Description"] },
            React.createElement(CompileJSX, null, level.description))));
}
//# sourceMappingURL=LevelCard.js.map