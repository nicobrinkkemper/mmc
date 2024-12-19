import * as React from "react";
import { CompileJSX } from "../../CompileJSX.js";
import { Card } from "../../components/Card.js";
import { MakerName } from "../../components/MakerName.js";
import { PublicImage } from "../../components/PublicImage.js";
import styles from "./MakerCard.module.css";

type MakerCardProps = {
  level: Pick<
    ThemeLevel,
    "makerName" | "nationality" | "makerId" | "makerDescription" | "images"
  >;
};

export function MakerCard({ level }: Readonly<MakerCardProps>) {
  return (
    <Card className={styles["MakerCard"]}>
      <PublicImage
        alt={`Mii: ${level.makerName.name}`}
        src={level.images.maker.src}
        srcSet={level.images.maker.srcSet}
        width={level.images.maker.width}
        height={level.images.maker.height}
        className={styles["MakerImage"]}
      />
      <MakerName
        makerName={level.makerName.name}
        nationality={level.nationality}
        makerId={level.makerId}
      />
      <div className={styles["Description"]}>
        <CompileJSX>{level.makerDescription}</CompileJSX>
      </div>
    </Card>
  );
}
