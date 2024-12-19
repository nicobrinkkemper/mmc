import * as React from "react";
import { MarioTurnsXthStatic } from "./MarioTurnsXth.js";
import { StayUpToDate } from "./StayUpToDate.js";

export const DefaultWelcomeContent = (props: MarioTurnsXthStaticProps) => {
  return (
    <>
      <MarioTurnsXthStatic {...props} />
      <StayUpToDate />
    </>
  );
};
