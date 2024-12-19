import * as React from "react";
import { CompileJSX } from "../../CompileJSX.js";
import { Card } from "../../components/Card.js";
import { MakerName } from "../../components/MakerName.js";
import { PublicImage } from "../../components/PublicImage.js";
import styles from "./MakerCard.module.css";
export function MakerCard({ level }) {
    return (React.createElement(Card, { className: styles["MakerCard"] },
        React.createElement(PublicImage, { alt: `Mii: ${level.makerName.name}`, src: level.images.maker.src, srcSet: level.images.maker.srcSet, width: level.images.maker.width, height: level.images.maker.height, className: styles["MakerImage"] }),
        React.createElement(MakerName, { makerName: level.makerName.name, nationality: level.nationality, makerId: level.makerId }),
        React.createElement("div", { className: styles["Description"] },
            React.createElement(CompileJSX, null, level.makerDescription))));
}
//# sourceMappingURL=MakerCard.js.map