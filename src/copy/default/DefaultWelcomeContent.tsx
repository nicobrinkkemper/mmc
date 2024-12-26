import * as React from "react";
import { MarioTurnsXthStatic } from "./MarioTurnsXth.js";
import { StayUpToDate } from "./StayUpToDate.js";

export const DefaultWelcomeContent: ThemeComponent<{
  info: pickRequired<["writtenOut", "themeYear"]>;
  images: pickOptional<["illustration"]>;
  pathInfo: required;
  clickable: required;
}> = (props) => {
  return (
    <>
      <MarioTurnsXthStatic {...props} />
      <StayUpToDate clickable={props.clickable} />
    </>
  );
};
