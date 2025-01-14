"use client";

import React from "react";

export const ErrorClientMessage = ({
  search,
  message,
}: {
  search?: string;
  message?: string;
}) => (
  <code>
    {typeof message === "string" && message !== ""
      ? message
      : decodeURI(
          typeof search === "string" && search !== ""
            ? search
            : window.location.search.split("error=")[1]
        )}
  </code>
);
