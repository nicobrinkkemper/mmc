import "@tanstack/react-router";
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<
      typeof import("../src/router/createRouter.js").createRouter
    >;
    context: {
      theme: Theme;
    };
  }
}
