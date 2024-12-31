import * as React from "react";
import styles from "./MakerName.module.css";

export const MakerName: ThemeComponent<{
  level: ["makerName", "nationality", "makerId"];
}> = ({
  level: {
    makerName: { value: makerName, slug: makerSlug },
    nationality,
    makerId,
  },
}) => {
  return (
    <div className={styles["MakerName"]} key={makerSlug}>
      <span
        className={`${
          styles["Nationality"]
        } flag-icon flag-icon-${nationality.toLowerCase()}`}
      />
      <span className={styles["Name"]}>{makerName}</span>
      {makerId ? <span className={styles["MakerId"]}>{makerId}</span> : null}
    </div>
  );
};