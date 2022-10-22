import { useParams } from "react-router";
import { YouTubeIframe } from "./YoutubeIframe";
export const weekTrailers = [
  "PbKK8_liEqA",
  "s5QguY9AAig",
  "ZE8hAA6mi2Y",
  "Ju_XQ1RKnU8",
  "dn3EvFPRsls",
  "DXE5-MfeGAs"
];

const WeekTrailer = () => {
    const { batchNumber } = useParams<{ batchNumber: string }>();
    const weekTrailer = weekTrailers[Number(batchNumber) - 1];
    if(!weekTrailer) return <p style={{fontSize:'1em',width: '100%'}}>Video coming soon!</p>;
    
    return (
      <div className="youtubeFlexDisable">
        <YouTubeIframe
          videoId={weekTrailer || "3FtgBWY0XVY"}
        />
      </div>
    );
  };

  export {WeekTrailer}