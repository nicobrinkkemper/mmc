import styles from "./WeekTrailer.module.css";
import { useParams } from "react-router";
import { YouTubeIframe } from "./YoutubeIframe";
import { useTheme } from "../theme/useTheme";
import { SNAP } from "../constants";
export const weekTrailers = {
  '7mmc': [
    "PbKK8_liEqA",
    "s5QguY9AAig",
    "ZE8hAA6mi2Y",
    "Ju_XQ1RKnU8",
    "dn3EvFPRsls",
    "DXE5-MfeGAs"
  ],
  '8mmc': [
    "X7502D3SSy4",
  ],
}

const WeekTrailer = () => {
  const { theme } = useTheme();
  const { batchNumber } = useParams<{ batchNumber: string }>();
  const weekTrailer = weekTrailers[theme][Number(batchNumber) - 1];
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