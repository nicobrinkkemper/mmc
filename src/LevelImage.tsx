import { levelPath } from "./levelPath";
import React, { Suspense } from "react";
import { SuspenseImg } from "SuspenseImage";
import { PICTURE_PLACEHOLDER } from "./constants";

const LevelImage = ({ levelName }: { levelName: string }) => {
  const s = levelPath(levelName, 250);
  const m = levelPath(levelName, 500);
  return (
    <picture className={`levelPicture`}>
      <Suspense fallback={<img src={PICTURE_PLACEHOLDER} className={"levelImg loading"} alt="loading" />}>
        <SuspenseImg
          className={"levelImg"}
          src={s}
          srcSet={`${s} 250w, ${m} 500w`}
          sizes={"(max-width: 250px) 250px, 500px"}
          alt={`Level Screenshot: ${levelName}`}
        />
      </Suspense>
    </picture>
  );
};
export { LevelImage };
