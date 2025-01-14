/**
 * Custom RSC mapper to transform anchor tags into client-side buttons
 */
export const clientNavigationMapper = {
  $: (
    type: string,
    props: any,
    _ref: string,
    owner: string,
    stack: string[][],
    flags: number
  ) => {
    // Only transform anchor tags with internal hrefs
    if (type === "a" && props.href?.startsWith("/")) {
      return [
        "$",
        "a",
        null,
        {
          ...props,
          onClick: (e: Event) => {
            e.preventDefault();
            // Handle client-side navigation
            window.history.pushState({}, "", props.href);
          },
          role: "link",
          "aria-label": props.children,
        },
        owner,
        stack,
        flags,
      ];
    }

    // Pass through other elements unchanged
    return ["$", type, null, props, owner, stack, flags];
  },

  // Pass through reference definitions unchanged
  D: (reference: string) => ["D", reference],
};
