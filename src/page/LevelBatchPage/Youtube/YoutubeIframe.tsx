import * as React from "react";
import styles from "./YoutubeIframe.module.css";

export enum Commands {
  play,
  pause,
  stop,
  mute,
  unMute,
}

type Props = {
  videoId: string;
  src: string;
};

const YouTubeIframeStatic = ({ videoId, src }: Props): React.JSX.Element => {
  return (
    <div className={styles["Youtube"]}>
      <iframe
        className={styles["Iframe"]}
        title={videoId}
        allowFullScreen={true}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        src={src ?? "about:blank"}
      />
    </div>
  );
};

export { YouTubeIframeStatic };
