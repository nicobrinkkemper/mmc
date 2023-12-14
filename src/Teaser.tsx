import React from "react";
import CountDown, { CountdownRenderProps } from "react-countdown";
import "./Teaser.css";
import { YouTubeIframe } from "./YoutubeIframe";
import { useLevelData } from "./useLevelData";
import Card from "./Card";
import { ToTheLevels } from "./ToTheLevels";
import { SNAP } from "./constants";
const trailerYtId = "3FtgBWY0XVY";
const Completionist = () => {
  return (
    <span style={{ display: "flex", margin: "1rem 0", color: "#000" }}>
      <ToTheLevels />
    </span >
  );
};

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed
}: CountdownRenderProps) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <p className="countdown">
        <strong>
          {days}
          {"\u00A0"}days{"\u00A0"}
        </strong>
        <strong>
          {hours}
          {"\u00A0"}hours{"\u00A0"}
        </strong>
        <strong>
          {minutes}
          {"\u00A0"}minutes{"\u00A0"}
        </strong>
        <strong>
          {seconds}
          {"\u00A0"}seconds{"\u00A0"}
        </strong>
      </p>
    );
  }
};

const Teaser = () => {
  const { startDate } = useLevelData();
  return (
    <div className="Teaser">
      <div className="youtubeWrapper">
        {SNAP ?? <YouTubeIframe
          videoId={trailerYtId}
        />}
      </div>
      <Card>
        <CountDown
          date={startDate.getTime()}
          renderer={renderer}
          daysInHours={true}
        />
      </Card>
      <Card>
        <div className="copy larger">
          <p>
            The event will start on{" "}
            {startDate.toLocaleString("en-us", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
            .
          </p>
          <p>Stay tuned for more details!</p>
        </div>
      </Card>
    </div>
  );
};

export { Teaser };
