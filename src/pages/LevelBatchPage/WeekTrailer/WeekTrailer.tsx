import styles from "./WeekTrailer.module.css";
import { useParams } from "react-router";
import { YouTubeIframe } from "./YoutubeIframe";
import { useTheme } from "../../../theme/useTheme";
import { SNAP } from "../../../constants";


const WeekTrailer = () => {
  const { data } = useTheme();
  const { batchNumber } = useParams<{ batchNumber: string }>();
  const weekTrailer = data.weektrailers[Number(batchNumber) - 1];
  if (!weekTrailer) return <p style={{ fontSize: '1em', width: '100%' }}>Video coming soon!</p>;

  return (
    <div className={styles.WeekTrailer}>
      {SNAP && <YouTubeIframe
        videoId={weekTrailer || "3FtgBWY0XVY"}
      />}
    </div>
  );
};

export { WeekTrailer }