let stashedResolve: null | ResolveFunction = null;
let warnedAboutConditionsFlag = false;

/**
 * This function is used to resolve the specifier to the URL.
 */
export async function resolve(
  specifier: string,
  context: ResolveContext,
  defaultResolve: ResolveFunction
): Promise<{ url: string }> {
  // We stash this in case we end up needing to resolve export * statements later.
  stashedResolve = defaultResolve;

  if (!context.conditions.includes("react-server")) {
    context = {
      ...context,
      conditions: [...context.conditions, "react-server"],
    };
    if (!warnedAboutConditionsFlag) {
      warnedAboutConditionsFlag = true;
      // eslint-disable-next-line react-internal/no-production-logging
      console.warn(
        "You did not run Node.js with the `--conditions react-server` flag. " +
          'Any "react-server" override will only work with ESM imports.'
      );
    }
  }
  return await defaultResolve(specifier, context, defaultResolve);
}

/**
 * This function is used to resolve the client import specifier to the URL.
 */
export function resolveClientImport(
  specifier: string,
  parentURL: string
): { url: string } | Promise<{ url: string }> {
  // Resolve an import specifier as if it was loaded by the client. This doesn't use
  // the overrides that this loader does but instead reverts to the default.
  // This resolution algorithm will not necessarily have the same configuration
  // as the actual client loader. It should mostly work and if it doesn't you can
  // always convert to explicit exported names instead.
  const conditions = ["node", "import"];
  if (stashedResolve === null) {
    throw new Error(
      "Expected resolve to have been called before transformSource"
    );
  }
  return stashedResolve(specifier, { conditions, parentURL }, stashedResolve);
}
