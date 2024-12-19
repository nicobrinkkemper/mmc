"use client";
import { Link, useLocation } from "@tanstack/react-router";
import * as React from "react";
import { useTheme } from "../../hooks/useTheme.js";
import { HomePageStatic } from "./HomePage.static.js";

export function HomePage() {
  const { theme, images, pathInfo, nextAndPrevTheme, info } = useTheme({
    pathInfo: useLocation().pathname,
    nextAndPrevTheme: true,
    info: true,
    images: true,
  });
  return (
    <HomePageStatic
      theme={theme}
      images={images}
      info={info}
      pathInfo={pathInfo}
      nextAndPrevTheme={nextAndPrevTheme}
      clickable={Link}
    />
  );
}
