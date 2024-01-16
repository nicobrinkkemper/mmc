import styles from "./WeekTrailer.module.css";
import { YouTubeIframe } from "./YoutubeIframe";
import { SNAP } from "../../../constants";
import { useBatch } from "../../../theme/useBatch";

const WeekTrailer = () => {
  const { weekTrailer } = useBatch();
  return (
    <div className={styles.WeekTrailer}>
      {SNAP && <YouTubeIframe
        videoId={weekTrailer}
      />}
    </div>
  );
};

export { WeekTrailer }