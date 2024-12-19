import * as React from "react";
import styles from "./Difficulty.module.css";
import { Stars } from "./Stars.js";
export const Difficulty = ({ difficulty, difficultyName }) => {
    return (React.createElement("div", { className: styles['Difficulty'] },
        React.createElement("span", { className: `${styles['Label']}` }, "Difficulty: "),
        React.createElement("span", { className: `${styles['Stars']}` }, difficulty ? React.createElement(Stars, { value: difficulty })
            : difficultyName ?? "Who knows?")));
};
//# sourceMappingURL=Difficulty.js.map