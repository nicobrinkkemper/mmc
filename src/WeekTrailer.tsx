import { useParams } from "react-router";
import { YouTubeIframe } from "./YoutubeIframe";
export const weekTrailers = [
  "b26QvbP4MUI",
  "-f83uRDCZpA",
  "ouKbaTu5YKc",
  "13Sb6V8ydPM",
  "G4mhHeXk3k0",
  "lANqCC2xPoo",
  "rvBtTv9aeo0",
  "oR_7lE_Zx2c",
  "VLiyJwx5T3E"
];

const WeekTrailer = () => {
    const { batchNumber } = useParams<{ batchNumber: string }>();
    const weekTrailer = weekTrailers[Number(batchNumber) - 1];
    if(!weekTrailer) return <p style={{fontSize:'1em',width: '100%'}}>Video coming soon!</p>;
    
    return (
      <div className="youtubeFlexDisable">
        <YouTubeIframe
          videoId={weekTrailer || "iY6Qj6L_oF0"}
        />
      </div>
    );
  };

  export {WeekTrailer}