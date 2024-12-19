import * as React from "react";
import type { ButtonProps } from "./Button.js";
import { Button } from "./Button.js";

export type ToTheLevelsStaticProps = {
  pathInfo: Pick<ThemePathInfo, "toLevels">;
} & Omit<ButtonProps, "icon" | "primary" | "to">;

export const ToTheLevelsStatic = ({
  pathInfo,
  ...props
}: ToTheLevelsStaticProps) => {
  return (
    <Button
      primary={true}
      icon="arrow-right"
      href={pathInfo.toLevels}
      {...props}
    >
      To the levels
    </Button>
  );
};
