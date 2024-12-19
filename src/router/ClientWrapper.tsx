"use client";
import * as React from "react";

export function ClientWrapper({
  Component,
  data,
}: {
  Component: React.ComponentType<any>;
  data: any;
}) {
  return <Component {...data} />;
}
