import classNames from "classnames";
import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { BackToWeeks } from "../../components/BackButton.js";
import { Button } from "../../components/Button.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { BatchStatic } from "./Batch.js";
import styles from "./Batch.module.css";
import { YouTubeIframeStatic } from "./Youtube/YoutubeIframe.js";
export function LevelBatchPageStatic({ theme, images, pathInfo, batch, clickable, }) {
    return (React.createElement(AppStatic, { theme: theme },
        React.createElement(LayoutStatic, { type: "simple", small: true, theme: theme, images: images, pathInfo: pathInfo, clickable: clickable },
            React.createElement(BackToWeeks, { toLevels: pathInfo.toLevels, clickable: clickable }),
            React.createElement(YouTubeIframeStatic, { videoId: batch.weekTrailer, src: `https://www.youtube.com/embed/${batch.weekTrailer}?modestbranding=1&enablejsapi=1&controls=1&rel=0&loop=1&listType=playlist` }),
            React.createElement(BatchStatic, { batch: batch, clickable: clickable }),
            React.createElement("div", { className: classNames(styles["Navigation"], batch.nextAndPrev.nextBatch.exists && styles["hasNextBatch"], batch.nextAndPrev.prevBatch.exists && styles["hasPreviousBatch"]) },
                batch.nextAndPrev.prevBatch.exists ? (React.createElement(Button, { icon: "arrow-left", iconPosition: "left", href: batch.nextAndPrev.prevBatch.batch.pathInfo.to, hidden: !batch.nextAndPrev.prevBatch.exists, clickable: clickable },
                    React.createElement("span", { className: styles["hidden"] }, "Previous"))) : null,
                batch.nextAndPrev.nextBatch.exists ? (React.createElement(Button, { icon: "arrow-right", href: batch.nextAndPrev.nextBatch.batch.pathInfo.to, hidden: !batch.nextAndPrev.nextBatch.exists, clickable: clickable }, "Next batch")) : null))));
}
//# sourceMappingURL=LevelBatchPage.js.map