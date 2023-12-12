import React, { Suspense } from "react";
import { makerPath } from "./makerPath";
import { SuspenseImg } from "./SuspenseImage";
import { PICTURE_PLACEHOLDER } from "./constants";

const MakerImage = ({ makerName }: { makerName: string }) => {
  const s = makerPath(makerName, 250);
  const m = makerPath(makerName, 500);
  const Fallback = <img src={PICTURE_PLACEHOLDER} className={"makerImg loading"} alt={`Maker Mii: ${makerName}`} />
  return (
    <picture className={`makerPicture`}>
      <Suspense fallback={Fallback}>
        <SuspenseImg
          className={"makerImg"} src={s} srcSet={`${s} 250w, ${m} 500w`} sizes={"(max-width: 250px) 250px, 500px"} alt={`Maker Mii: ${makerName}`} />
      </Suspense>
    </picture>
  );
};
export { MakerImage };
