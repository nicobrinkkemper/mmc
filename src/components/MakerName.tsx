import clsx from "clsx";
import * as React from "react";
import { safeSnakecase } from "../utils/safeSnakecase.js";
import styles from "./MakerName.module.css";
type MakerNameType = ThemeComponent<
  {
    level: ["makerName", "nationality", "makerId"];
  },
  "div",
  {
    compact?: boolean;
  }
>;

const splitSymbols = (s: string) =>
  s
    .split(/[,&]/g)
    .filter((s) => s.length !== 0)
    .map(trim);
const trim = (s: string) => s?.trim() ?? "";
const nationalityFlag = (nationality: string = "") =>
  `fi fi-${nationality.toLowerCase()}`;

export const MakerName: MakerNameType = ({
  level: {
    makerName: { value: makerName, slug: makerSlug },
    nationality,
    makerId,
  },
  compact = false,
  className,
  ...props
}) => {
  const isMultiMaker = makerName.split(",").length > 1;
  const classes = [styles["MakerName"]];
  if (compact) {
    classes.push(styles["compact"]);
  }
  if (isMultiMaker) {
    const makers = splitSymbols(makerName);
    const nationalities = splitSymbols(nationality).map(nationalityFlag);
    const makerIds = splitSymbols(makerId);
    const makerProps = makers.map((maker, index) => ({
      makerName: maker,
      nationality: nationalities[Math.min(index, nationalities.length - 1)],
      makerId: makerIds[Math.min(index, makerIds.length - 1)],
      makerSlug: safeSnakecase(maker),
    }));
    return (
      <div
        className={clsx(className, styles["MakerCollab"])}
        key={makerSlug}
        {...props}
      >
        {makerProps.map(({ makerName, nationality, makerId, makerSlug }) => (
          <div className={clsx(classes)} key={makerSlug}>
            <span
              className={`${styles["Nationality"]} ${nationalityFlag(
                nationality
              )}`}
            />
            <span className={styles["Name"]}>{makerName}</span>
            {makerId ? (
              <span className={styles["MakerId"]}>{makerId}</span>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={clsx(classes, className)} key={makerSlug} {...props}>
      <span
        className={`${styles["Nationality"]} ${nationalityFlag(nationality)}`}
      />
      <span className={styles["Name"]}>{makerName}</span>
      {makerId ? <span className={styles["MakerId"]}>{makerId}</span> : null}
    </div>
  );
};
