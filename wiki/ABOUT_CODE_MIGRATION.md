# About the Code Migration in this repository

This project started out as the 4ymm website. It was a simple website designed by Birdhare and written by me in create-react-app.
It used a google spreadsheet from Lektor, that he was using to make all the trailers for the 4ymm event.
People say never use a spreadsheet as a database, so that's exactly how we started out and we've not had the need for anything more complex yet.
The startup directory has always been there, and what it did was download the spreadsheet and use `lovell/sharp` to generate the images.
I've been building onto this ever since, where the noticeble changes are going from a per-event repository to having a single repository for all events and a logo-carousel to navigate between them.
This is because, I was copying all the repositories but kept them backwards compatible with each other.

# CRA  to vite

In this time, create-react-app has been deprecated by the official React team. It has since been replaced with Vite.

# Commonjs to esmodules

This is arguably the most important and experimental change to the repository. You can read more about it in [ABOUT_CODE_ARCHITECTURE.md](ABOUT_CODE_ARCHITECTURE.md).

# Snapshot SSG to RSC and SSR

Before we used `react-snap` and `react-snapshot` to generate the website. It's a simple library that uses puppeteer/jsdom to generate the website. It was good in the sense that it allowed us to generate a hydratable static version of the React app that was exactly the same as the one we were developing in the browser.

This also meant that we could use `useContext` and Providers to easily manage the theme data and other global data without having to drill the props through the component tree.

We could also use the `SNAP` environment variable to determine if we were generating the website or not, for example to disable the youtube embeds.

The reason why we need SSG or SSR is because we are hosting it on a simple serverless platform - we mirror the URL by generating the files. For example we generate	`4ymm/level/1/1/index.html` for the first level of the 4ymm event. When we make a change to the website, we need to generate the files again and reupload them.

# Snapshot approach overhead

The snapshot approach was good, and it had basically no downsides for our once-a-year events. It was simple, allowed everything to be written using hooks.
But, I noticed that having puppeteer and or jsdom at the end of the pipeline was keeping us from thinking server side - using Wizulu's or TGR's api's for example.
The resources it took to generate is the final HTML wasn't trivial. Puppeteer needs an entire headless chrome browser. JSDOM needs less but still significant resources, and it is not compatible with esmodules. Nor is happy-dom. Ultimately not a good solution, and this is what Wizulu's original server-side rendering PR set in motion.

# Server side rendering

To render on the server, we need to think about our structure differently than for the browser. For example, we should NOT use hooks as they are moving parts that have no reason to be on the server. This is easier said than done, because what if our "react-accessible-accordion" component needs to use hooks? What if our `Link` from "@tanstack/react-router" needs hooks? They can't. We need to prevent these from even loading on the server. To achieve this, many components were rewritten to be static components.

Before
```tsx
import { Link, type LinkProps } from "react-router-dom";
const SomeButtomIdk = (props: { children: React.ReactNode } & LinkProps) => {
  return <marquee><Link {...props}>{props.children}</Link></marquee>;
};
```

After
```tsx
const SomeButtomIdk = ({ as: Component, ...props }: { as: React.ElementType }) => {
  return <marquee><Component {...props}>{props.children}</Component></marquee>;
};
```

# RSC setup

RSC is still experimental, and ESM support is not fully there yet. To achieve full support, I had to build the entire React github repository from source and then copy the `oss-experimental` files from the build folder into the `node_modules` folder. To save you from doing this I have included the files in the root of this repository and the script should install copy them after running `npm install`.

It may happen that you need to run `npm run postinstall` after installing a package, since it does not run the postinstall script.


For example when you see:
```
Could not find a declaration file for module 'react-server-dom-esm/server.node'
```
Run `npm install` or `npm run postinstall` to fix this.

Note: `npm install some-package-name` will NOT run the postinstall script, so `postinstall` has to be run manually after.


# ESM

The startup folder has always been written using esmodules and typescript, but create-react-app required CommonJS. When I was implementing features for the startup folder, I was thinking
it would be nice to reuse some of the code for computed properties that I didn't need to store in the `themes.json` file. When we moved to vite it opened up the oppurtunity to do this.
This is also around the time Wizulu's server-side rendering PR was merged, and it meant we now had to think about three different packages inside the same repository. By using esmodules, each file can run independently and in each environment. You don't have to know multiple file formats, everything is using the same syntax and you can just import them relatively.

NOTE: It might be tempting to try to avoid `../../` by using Typescript's path aliases. Personally I think it's better to use the relative path. This advice goes back to the "transpilation only" philosophy, Typescript WILL NOT change the imports, so unless you use something like `tsc-alias` the code becomes less portable.

## .js, .mjs, .tsx, which to use?

Following the "transpilation only" philosophy, we should write .js in our imports.
General rule of thumb:

Does it use JSX? Use .tsx and import with .js.
Does it use JS? Use .ts and import with .js.
Is it a portable esmodule program? Use .mts and import using .mjs.

Since we are using module:true in our package.json, we can use .js and .mjs interchangeably.
mjs/cjs is useful for node.js only, though browsers can use it too. It's useful to let nodejs know it's definetly a module file, it makes the program more portable. Browser really don't care, but *actually* the react esmodule source code does use it for browser code too:
```tsx
/* esm.sh - react@19.0.0 */
export * from "/stable/react@19.0.0/es2022/react.development.mjs";
export { default } from "/stable/react@19.0.0/es2022/react.development.mjs";
```

This is why I think it'll become more common in the future to name files like .mts, though a compiler can also automatically add that bit and make two seperate versions. It's all a matter of taste in the end.
