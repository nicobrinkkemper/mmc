import classNames from "classnames";
import * as React from "react";
import { Button } from "../../components/Button.js";
import styles from "./Level.module.css";
import { LevelCard } from "./LevelCard.js";
import { MakerCard } from "./MakerCard.js";
export function LevelStatic({ level, clickable, }) {
    return (React.createElement(React.Fragment, null,
        React.createElement(LevelCard, { level: level }),
        React.createElement(MakerCard, { level: level }),
        React.createElement("div", { className: classNames(styles["Navigation"], level.nextAndPrev.nextLevel.exists && styles["hasNextLevel"], level.nextAndPrev.prevLevel.exists && styles["hasPreviousLevel"]) },
            level.nextAndPrev.prevLevel.exists ? (React.createElement(Button, { icon: "arrow-left", iconPosition: "left", href: level.nextAndPrev.prevLevel.level.pathInfo.to, hidden: !level.nextAndPrev.prevLevel.exists, clickable: clickable },
                React.createElement("span", { className: styles["hidden"] }, "Previous"))) : null,
            level.nextAndPrev.nextLevel.exists ? (React.createElement(Button, { icon: "arrow-right", href: level.nextAndPrev.nextLevel.level.pathInfo.to, hidden: !level.nextAndPrev.nextLevel.exists, clickable: clickable }, "Next level")) : null)));
}
//# sourceMappingURL=Level.js.map