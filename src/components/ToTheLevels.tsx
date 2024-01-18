import { useTheme } from "../theme/useTheme";
import Button, { ButtonProps } from "./Button";

export const ToTheLevels = (
  props: Omit<ButtonProps, "icon" | "primary" | "to">
) => {
  const { themeSlug } = useTheme();
  return (
    <Button
      primary={true}
      icon="arrow-right"
      to={`/${themeSlug}levels/`}
      {...props}
    >
      To the levels
    </Button>
  );
};
