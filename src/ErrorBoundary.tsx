"use client";
import React from "react";

const Redirect = ({ search }: { search?: string }) => {
  React.useEffect(() => {
    if (!window.location.href.includes("/404")) {
      const timeout = setTimeout(() => {
        // window.location.href = "/404" + search;
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, []);
  return null;
};
/**
 * Error boundary
 */
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  { hasError: boolean; error: Error | null }
> {
  state: { hasError: boolean; error: Error | null } = {
    hasError: false,
    error: null,
  };
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
    this.setState({
      hasError: true,
      error:
        error instanceof Error
          ? error
          : new Error("Error", {
              cause: error,
            }),
    });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return <Redirect search={`?error=${this.state.error?.message}`} />;
  }
}
