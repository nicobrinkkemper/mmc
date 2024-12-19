import * as React from "react";
import styles from "./YoutubeIframe.module.css";
export var Commands;
(function (Commands) {
    Commands[Commands["play"] = 0] = "play";
    Commands[Commands["pause"] = 1] = "pause";
    Commands[Commands["stop"] = 2] = "stop";
    Commands[Commands["mute"] = 3] = "mute";
    Commands[Commands["unMute"] = 4] = "unMute";
})(Commands || (Commands = {}));
const YouTubeIframeStatic = ({ videoId, src }) => {
    return (React.createElement("div", { className: styles["Youtube"] },
        React.createElement("iframe", { className: styles["Iframe"], title: videoId, allowFullScreen: true, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", src: src ?? "about:blank" })));
};
export { YouTubeIframeStatic };
//# sourceMappingURL=YoutubeIframe.js.map