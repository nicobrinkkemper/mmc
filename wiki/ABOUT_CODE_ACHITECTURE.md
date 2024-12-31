# About the Code Architecture in this repository

The Mario Maker level maker community is a global community of people who love to build.
If you've stumbled upon this repository, you're probably interested in how this code works... you found the right place!

Even though the Mario Maker community might love to build, we might not all be software developers!
That's why, I will explain the code architecture in a way that is easy to understand for everyone.

# geitje/bbmariomaker2's contraption design

If you you don't know who bbmariomaker2 and or geitje is in the Mario Maker community, here's a list of things you may know me for:

- MarI/O / infinite freeze detector contraption level
- Song of Storms, Wrecking Crew, Bombastic Pirates Fortress, Death Mountain, Lost Woods. First of it's kind global looping music levels.
- Larry's Sabotage Mission, super fast and even the first 3DW global reusable jump detector ever made
- Mario Math - The first RNG math level ever made
- First discovery of the hammer bro + claw undo glitch (commonly used for glitch sequences)
- Some post from 2020 still get discussed today, the "resetters/flippers/useless-machines/triggers" always stay relevant
- I've written three long Mario Maker guide. Mario Maker RNG Guide, Mario Maker Global Music Guide and Geitje's contraption building guide.
- Of course, couldn't have done it without the community and everyone in the [discords](https://discord.gg/R8aYkzzH)

Anyway enough bragging, I wanted to just establish that in Mario Maker 2 I'm also a bit of an engineer. In real life no different.

## The code architecture

It's a take on React's new server side components and compiler. To use the new compiler with vite, we added the babel package as by their instructions.
This should make vite work with the new compiler, and the resulting bundle should be compatible.

To get the server to then load these components, we use the `react-server` condition. This is also by the instructions of react. Where it gets
a little tricky is that we need to think about a new problem: esmodules.

Esmodules were used in this project before, to do the startup script. They are nice and portable scripts that you can run anywhere. However,
not everything works with esmodules and not everything works with react 19. There'll be a lot of breaking changes, but this project
won't be bothered by those since we're ahead of the curve. We are already using esmodules for everything. Because of that tho, some things
might be a bit messy. For example, I couldn't find a good csv parser that worked with esmodules only. On the other hand, that means we 
have little dependencies to worry about and we truely own the code.

By doing so, we can reuse code that we use on the server, for the startup script and for the client. All the code that can be
used in any environment, should go into the `src` folder. The startup code, like resizing images, should go into the `startup` folder. 
Then the server code should go into the `server` folder.

Other than that, there are no other rules.

# The page and route system

The page system I tried to make it work generically for all pages. It uses no dependencies for this, because the site is very static and thus no complex routing is needed.
To get everything to work statically, we favor prop drilling to get the data to the components. To achieve consistent propdrilling,
there's a global type system that you can use to pick props from the static data, it's up to the parent component to then pass the props to the child component
as the TypeScript compiler will complain if you don't.

The `prop` file next to every page contains the actual runtime options, which is the same as the type system using just `true` or pick some keys like `['theme']`.

## The Type System

To make a new component, simply use the `ThemeComponent` type which is globally available.

```tsx
type MyComponentType = ThemeComponent<{
  level: ['makerName', 'nationality', 'makerId']
}>;

const MyComponent: MyComponentType = ({ level: { makerName, nationality, makerId } }) => {
  return <div>{makerName} {nationality} {makerId}</div>;
};
```
There's a couple of things you can request from the type system, like the `level` prop. You do not have to know the value of the prop,
and you can't request any other type than what it actually is.

To make a new page, use the ThemePageComponent type.

```tsx
type MyPageType = ThemePageComponent<`/my-new-page`>;

const MyPage: MyPageType = ({ level: { makerName, nationality, makerId } }) => {
  return <div>{makerName} {nationality} {makerId}</div>;
};
```
Notice we have not given any options like the ThemeComponent type. This is because the ThemePageComponent will define it's options as runtime options
in the `prop` file next to the page.

```ts
export const route = `/my-new-page` as const;

export type RouteType = typeof route;

export const props = createProps(
  route,
  {
    images: true,
    info: true,
    pathInfo: true,
    adjacent: true,
    clickable: true,
  },
  (props) => {
    console.log(route);
    return props;
  }
);
```
Okay, but I'm not a magician, and I haven't build in file-based routing. So we have to manually drill this down,
to make it easier we make the index.ts file that exports the page, props and route.
```ts
export { Page } from "./page.js";
export { props, route } from "./props.js";
```
Now we import the new page into the pages.ts file.
```ts
import * as NotFound from "./404/index.js";
import * as Credits from "./:theme/credits/index.js";
import * as Home from "./:theme/index.js";
import * as Level from "./:theme/levels/:batchNumber/:order/index.js";
import * as LevelBatch from "./:theme/levels/:batchNumber/index.js";
import * as LevelBatches from "./:theme/levels/index.js";
import * as MainPage from "./index.js";
// add your import 

export const pages = {
  [MainPage.route]: MainPage,
  [Home.route]: Home,
  [NotFound.route]: NotFound,
  [Credits.route]: Credits,
  [LevelBatches.route]: LevelBatches,
  [LevelBatch.route]: LevelBatch,
  [Level.route]: Level,
  // add your import
  [MyNewPage.route]: MyNewPage,
} as const;
``` 
 Finally, we have to let the router know how to match the segments to the page.

```ts
/**
 * For each possible nested level, we have a map of guards that will be used to validate the path.
 * The guards are functions that return true if the path segment is valid for that level.
 * We will use the first guards to start counting, ignoring any segments infront that's not a theme or 404 (in our case)
 */
export const pageNesting = {
  0: {
    $theme: isValidTheme,
    "404": (seg: string): seg is typeof notfound => seg === notfound,
    //
    "my-new-page": (seg: string): seg is "my-new-page" => seg === "my-new-page",
  },
  1: {
    credits: (seg: string): seg is typeof credits => seg === credits,
    levels: (seg: string): seg is typeof levels => seg === levels,
  },
  2: {
    $batchNumber: (seg: string): seg is string => !isNaN(Number(seg)),
  },
  3: {
    $order: (seg: string): seg is string => !isNaN(Number(seg)),
  },
};

```

this also brings us to how we can add variable path segments, for example say we want to use 
the level-code as the path to a level, we could do

```ts
export const pageNesting = {
  0: {
    $theme: isValidTheme,
    "404": (seg: string): seg is typeof notfound => seg === notfound,
  },
  1: {
    credits: (seg: string): seg is typeof credits => seg === credits,
    levels: (seg: string): seg is typeof levels => seg === levels,
  },
  2: {
    $batchNumber: (seg: string): seg is string => !isNaN(Number(seg)),
    $levelCode: (seg: string): seg is string => seg.split("-").length === 3,
  },
  3: {
    $order: (seg: string): seg is string => !isNaN(Number(seg)),
  },
};
```
That should be all you need to add new things, but maybe some new types here and there are still needed.

# The data system

We download the csv at startup and then it's just json files. We could build in route splitting, but since it's 
around the max bundle size of 500kb - all themes are downloaded at once and navigating can be done statically.

