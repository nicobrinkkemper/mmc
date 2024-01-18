import { useEffect, useState } from "react";
import { SNAP } from "../../../constants";
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
};

const YouTubeIframe = ({ videoId }: Props): JSX.Element => {
  const [src, setSrc] = useState<string>("about:blank");
  useEffect(() => {
    // this is to not mess up puppeteer
    SNAP &&
      setSrc(
        `https://www.youtube.com/embed/${videoId}?modestbranding=1&enablejsapi=1&controls=1&rel=0&loop=1&listType=playlist`
      );
  }, [videoId]);

  return (
    <div className={styles.Youtube}>
      <iframe
        className={styles.Iframe}
        title={videoId}
        allowFullScreen={true}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        src={src}
      />
    </div>
  );
};

export { YouTubeIframe };
