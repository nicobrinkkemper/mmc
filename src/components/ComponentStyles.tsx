import * as React from "react";

type ComponentStylesType = ThemeComponent<{
  pathInfo: ["theme"];
}>;

export const ComponentStyles: ComponentStylesType = ({
  pathInfo: { theme },
}) => {
  return (
    <>
      <style type="text/css">
        {`
          .test {
            background-color: red;
          }
        `}
      </style>
    </>
  );
};
