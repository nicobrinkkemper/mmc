# The Official Mario Maker Celebration Repository

The best Mario Makers from around the world showcase their style.

[Official site](https://mmcelebration.com)

[Github hosted (latest)](https://nicobrinkkemper.github.io/mmc)

- [4YMM](https://mmcelebration.com/4ymm)
- [5YMM](https://mmcelebration.com/5ymm)
- [6YMM](https://mmcelebration.com/6ymm)
- [7MMC](https://mmcelebration.com/7mmc)
- [8MMC](https://mmcelebration.com/8mmc)
- [9MMC](https://mmcelebration.com/9mmc)

## Overall workflow

### `npm run start` or `npx vite`

We use vite as the main development environment. Please refer to the [vite docs](https://vitejs.dev/guide/) for more information.

### `npm run build` or `npx vite build`

Whatever vite will bundle will be our "intermediate" build. It generates the `build` folder, which is the final product - but not yet "set in stone".
To do that, we can run our static site generator, which is kind of like an after-burner for the vite build.

### `npm run preview` or `npx vite preview`
If you want - at any point - to take a look at the intermediate build, you can run `npm run build` and then `npm run preview`.
There is also a express server that you can run with `npm run serve`, this will give you full control over the preview server
in the `server/dev-server.mjs` file. We use this to preview the build folder as it would be on github pages (using the `mmc` PUBLIC_URL).

### `npm run server:start`

This starts the actual server that *could* be used to serve the website, but in our case we use it to run the static site generator.
Still, we can also use it to get a preview of the final product - after the intermediate build has been created. This will serve
the HTML in a fully static way, using the new react-compiler to render the pages as server components and or hydrated html on first load.

### `npm run server:export`

If the server is running, you can use this command to start the export process. Be aware, this will overwrite the build folder
with the final product. All the individual pages will get their own html file, with the favicons, title, etc already set.

## Adding levels and themes

To get the data in sync, we use a [google spreadsheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub) to keep track of everything.
Each tab has a GID, and these GID's we put in the [themeConfig.ts](src/config/themeConfig.ts) file:

This is everything that is needed for a theme to work:
```
.
├── public/
│   └── 9mmc/
│       ├── level/              # Level screenshots
│       │   ├── level_name-580.webp
│       │   └── level_name-1160.webp
│       ├── maker/              # Maker avatars
│       │   ├── maker_name-180.webp
│       │   └── maker_name-360.webp
│       └── batch/              # Batch images
│           ├── batch_1-80.webp
│           └── batch_1-160.webp
│
├── src/
│   ├── config/
│   │   └── themeConfig.ts     # Add theme configuration
│   │
│   ├── content/
│   │   ├── index.ts           # Export theme content
│   │   └── 9mmc.tsx          # Theme-specific content
│   │
│   └── css/
│       ├── index.ts           # Export theme styles
│       └── 9mmc.module.css   # Theme-specific styles
│
└── resizeImages/
    └── 9mmc/                 # Original source images
        ├── level/
        ├── maker/
        └── batch/
```
In `themeConfig.ts` we can define the main theme configuration. To make it easier, there's a helper function `createConfig` that will create the config object for you
based on the bare minimum.
```ts
createConfig({
    theme: "9mmc",
    gid: 1234567890,
    weekTrailers: ["1234567890", "1234567890"],
})
```	

### `npm run startup`

This is the command that should be run whenever the data or images change. It might also run automatically for
some commands - you should look for the scripts section in the [package.json](package.json), if it shows something like `run-s startup` 
then that tells you what you need to know.

- write local env file
    - first time only
- resize images
    - once per image, delete image if you want to resize it again
- download and parse csv
    - this is ALWAYS run, even if the csv is already downloaded, to make sure the data is up to date
- combine image and csv data
- check existence of needed level, maker, thumbnail
- output `src/data/generated/themes.ts`, which is the main data file for the website


# Theming
## /startup

This code base downloads the spreadsheet information and combines it with images and art work to build
the final product.

## themes.json

In the intitial startup, the various files are generated to the src/data/generated folder. These files
can be imported to create the react application. It will be in sync with the spreadsheet everytime
you run `npm run startup`.

## /resizeImages
All original images are collected here using snake_case naming.

All images will be resized to single and double format, a href and srcSet attribute are stored in themes.json.

## src/css/index.ts
```ts
export { default as _4ymm } from "./4ymm.module.css";
export { default as _5ymm, default as _6ymm } from "./5ymm.module.css";
export { default as _7mmc } from "./7mmc.module.css";
export { default as _8mmc } from "./8mmc.module.css";
```
Each theme sets css variables that alter the look of the website.
This file needs to have such an export for each theme.

Any class defined in a theme has to be defined in all the themes. Currently only the Theme class is used to keep it simple.
That means, whenever we add a new theme we also need to add a content file and a css module - or in the very least export a key for it like we did for 6ymm.

```ts
const Theme = useCss('Theme')
...
<App className={Theme}>
```
This applies the current theme's css variables to the website.

## src/content/index.ts
```ts
export * as _4ymm from "./4ymm";
export * as _5ymm from "./5ymm";
export * as _7mmc from "./7mmc";
export * as _8mmc from "./8mmc";
export * as _default from "./default";
```
The welcome, about and credit contents are exported here. Use it like so:
```tsx
<Content.About />
<Content.Welcome />
<Content.Credits />
```
We drill down all the props in to the content files, same as we do for the default content. You can request
props through the custom made type system, and at the page level you can do the same in the `props` file.

