import * as React from "react";
import { MarioTurnsXth } from "./MarioTurnsXth.js";
import { StayUpToDate } from "./StayUpToDate.js";

export const DefaultWelcomeContent: DefaultWelcomeContentType = ({
  info: { writtenOut, themeYear },
  pathInfo: { toLevels },
  images: { illustration },
  clickable,
}) => {
  return (
    <>
      <MarioTurnsXth
        info={{ writtenOut, themeYear }}
        clickable={clickable}
        images={{ illustration }}
        pathInfo={{ toLevels }}
      />
      <StayUpToDate clickable={clickable} />
    </>
  );
};