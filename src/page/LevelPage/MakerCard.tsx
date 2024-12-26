import * as React from "react";
import { CompileJSX } from "../../CompileJSX.js";
import { Card } from "../../components/Card.js";
import { MakerName } from "../../components/MakerName.js";
import { PublicImage } from "../../components/PublicImage.js";
import styles from "./MakerCard.module.css";

export const MakerCard: ThemePageComponent<
  `/${Theme}/level/${NumberParam}/${NumberParam}`,
  {
    level: pickRequired<
      ["makerName", "nationality", "makerId", "images", "makerDescription"]
    >;
  }
> = ({
  level: { makerName, nationality, makerId, images, makerDescription },
}) => {
  return (
    <Card
      className={styles["MakerCard"]}
      heading={undefined}
      subHeading={undefined}
      images={{}}
      clickable={undefined}
    >
      <PublicImage
        alt={`Mii: ${makerName.value}`}
        src={images.maker.src}
        srcSet={images.maker.srcSet}
        width={images.maker.width}
        height={images.maker.height}
        className={styles["MakerImage"]}
      />
      <MakerName
        makerName={makerName.value}
        nationality={nationality}
        makerId={makerId}
      />
      <div className={styles["Description"]}>
        <CompileJSX>{makerDescription}</CompileJSX>
      </div>
    </Card>
  );
};
