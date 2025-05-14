"use client";
import React from "react";
import { ErrorMessage } from "./ErrorMessage.js";

export class ErrorBoundary extends React.Component {
  public state: {
    hasError: boolean;
    error: Error | null;
  } = {
    hasError: false,
    error: null,
  };
  public props: {
    children: React.ReactNode;
  } = {
    children: null,
  };
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
    this.props = props;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error) {
        return (
          <ErrorMessage
            error={{
              message: this.state.error.message,
              stack: this.state.error.stack,
            }}
          />
        );
      }
      return <div>Error</div>;
    }
    return this.props.children;
  }
}
