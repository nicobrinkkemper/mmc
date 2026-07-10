import * as React from "react";
import { Card } from "../../../../../components/Card.js";
import { CompileJSX } from "../../../../../components/CompileJSX.js";
import { MakerName } from "../../../../../components/MakerName.js";
import { PublicImage } from "../../../../../components/PublicImage.js";
import styles from "./MakerCard.module.css";

type MakerCardType = ThemeComponent<{
  level: ["makerName", "nationality", "makerId", "images", "makerDescription"];
}>;

export const MakerCard: MakerCardType = ({
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
        level={{
          makerName,
          nationality,
          makerId,
        }}
      />
      <div className={styles["MakerDescription"]}>
        <CompileJSX>{makerDescription}</CompileJSX>
      </div>
    </Card>
  );
};
