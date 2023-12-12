import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
const icons = {
  "arrow-right": (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 9.375C0 9.78921 0.335787 10.125 0.75 10.125L11.8806 10.125C12.5488 10.125 12.8834 10.9329 12.4109 11.4053L7.93471 15.8815C7.64108 16.1752 7.64192 16.6515 7.93658 16.9441L8.46968 17.4734C8.76287 17.7645 9.2363 17.7637 9.52846 17.4715L17.4697 9.53033C17.7626 9.23744 17.7626 8.76256 17.4697 8.46967L9.53033 0.530329C9.23744 0.237436 8.76256 0.237436 8.46967 0.530331L7.94361 1.05639C7.6509 1.3491 7.65069 1.82361 7.94313 2.11658L12.4137 6.59514C12.8855 7.06781 12.5507 7.875 11.8829 7.875L0.75 7.875C0.335787 7.875 0 8.21079 0 8.625V9.375Z"
        fill="F6F7F8"
      />
    </svg>
  ),
  folder: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z"
        fill="FACD00"
      />
    </svg>
  ),
  "play-button": (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z"
        fill="FACD00"
      />
    </svg>
  ),
  "arrow-left-inverted": (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(180deg)" }}
    >
      <path
        d="M0 9.375C0 9.78921 0.335787 10.125 0.75 10.125L11.8806 10.125C12.5488 10.125 12.8834 10.9329 12.4109 11.4053L7.93471 15.8815C7.64108 16.1752 7.64192 16.6515 7.93658 16.9441L8.46968 17.4734C8.76287 17.7645 9.2363 17.7637 9.52846 17.4715L17.4697 9.53033C17.7626 9.23744 17.7626 8.76256 17.4697 8.46967L9.53033 0.530329C9.23744 0.237436 8.76256 0.237436 8.46967 0.530331L7.94361 1.05639C7.6509 1.3491 7.65069 1.82361 7.94313 2.11658L12.4137 6.59514C12.8855 7.06781 12.5507 7.875 11.8829 7.875L0.75 7.875C0.335787 7.875 0 8.21079 0 8.625V9.375Z"
        fill="F6F7F8"
      />
    </svg>
  ),
  "arrow-left": (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8.625C18 8.21079 17.6642 7.875 17.25 7.875H6.11941C5.45123 7.875 5.11661 7.06714 5.58908 6.59467L10.0653 2.11846C10.3589 1.82483 10.3581 1.34851 10.0634 1.05593L9.53032 0.526588C9.23713 0.235461 8.7637 0.236298 8.47154 0.528459L0.53033 8.46967C0.237436 8.76256 0.237437 9.23744 0.53033 9.53033L8.46967 17.4697C8.76256 17.7626 9.23744 17.7626 9.53033 17.4697L10.0564 16.9436C10.3491 16.6509 10.3493 16.1764 10.0569 15.8834L5.58632 11.4049C5.11449 10.9322 5.44927 10.125 6.11712 10.125H17.25C17.6642 10.125 18 9.78921 18 9.375V8.625Z"
        fill="F6F7F8"
      />
    </svg>
  ),
  "info-inverted": (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
        fill="#currentColor"
      />
    </svg>
  ),
};

const createIcon = (icon: keyof typeof icons) => {
  return () => <span className={["Icon", icon].join(" ")}>{icons[icon]}</span>;
};

export type ButtonProps = PropsWithChildren<{
  primary?: boolean;
  inverted?: boolean;
  to: string;
  id?: string;
  icon: keyof typeof icons;
  iconPosition?: "left" | "right";
  classList?: string[]
}>;
function LinkOrAnchor(
  props: React.PropsWithoutRef<LinkProps> &
    React.RefAttributes<HTMLAnchorElement>
): ReturnType<typeof Link> {
  if (
    typeof props.to === "string" &&
    (props.to.startsWith("http://") ||
      props.to.startsWith("https://") ||
      props.to.startsWith("//"))
  ) {
    const { to: href, children, ...restProps } = props;
    return (
      <a href={href} {...restProps} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link {...props} />;
}
const Button = ({
  children,
  primary,
  icon,
  to,
  inverted = false,
  iconPosition = "right",
  classList = [],
  id,
}: ButtonProps) => {
  const Icon = createIcon(icon);
  const classes = ["Button", icon, ...classList];
  if (primary) classes.push("primary");
  if (inverted) classes.push("inverted");
  if (typeof icons[icon] === "string") classes.push("hasIcon");
  if (iconPosition === "left") classes.push("iconIsLeft");
  const props = {
    ...(typeof id === "string" ? { id } : {}),
    to,
    className: classes.join(" "),
  };

  return (
    <LinkOrAnchor {...props}>
      <div className="Button-inner">
        {iconPosition === "left" ? <Icon /> : null}
        <span>{children}</span>
        {iconPosition !== "left" ? <Icon /> : null}
      </div>
    </LinkOrAnchor>
  );
};

export default Button;
export { Button };
