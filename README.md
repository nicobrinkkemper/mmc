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


### `npm run startup`
- resize images
- download and parse csv
- combine image and csv data
- check existence of needed level, maker, thumbnail
- output `themes.json` in convenient format for react

### `npm run start`
Run react app using generated `themes.json` and images

### `npm run build`
Build production version of the site to upload to [mmcelebration.com](https://mmcelebration.com)

Every page of the website is post-processed via [react snap](https://github.com/stereobooster/react-snap).


# Theming
## /startup
To get all the art work in sync, the crew uses a [google spreadsheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub) to keep track
of everything. This goes in to the trailers, the art work and the website.

This code base downloads the spreadsheet information and combines it with images and art work to build
the final product.

## themes.json

Get the data for the current theme
```tsx
const {data} = useTheme();
// data includes all the data for the current theme
<PublicImage {...data.images.logo} />
```

Get the current level
```ts
const {level} = useLevel();
```

Get the current batch
```ts
const {batch} = useBatch();
```

## /resizeImages
All original images are collected here using snake_case naming.

All images will be resized to single and double format, a href and srcSet attribute are stored in themes.json.

## src/css/index.ts
```ts
export { default as _4ymm } from "./4ymm.module.css";
export { default as _5ymm } from "./5ymm.module.css";
export { default as _6ymm } from "./5ymm.module.css"; // same as 5ymm
export { default as _7mmc } from "./7mmc.module.css";
export { default as _8mmc } from "./8mmc.module.css";
```
Each theme sets css variables that alter the look of the website.
This file needs to have such an export for each theme.

Any class defined in a theme has to be defined in all the themes. Currently only the Theme class is used to keep it simple.

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
export * as _6ymm from "./5ymm"; // same as 5ymm
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
Using these components will automatically load the right content for the theme, based on what is available. Any props given to the component
will be given to the final component as well.

## src/config/themeConfig.ts
```ts
...
_5ymm: {
    gid: 588603541,
    weektrailers: ["b26QvbP4MUI", "-f83uRDCZpA", "ouKbaTu5YKc", "13Sb6V8ydPM"],
}
```
This is the entry point for all themes. There's a few requirements:
- GID for the spreadsheet
- Weektrailer for each batch in the spreadsheet
- Resized maker image, screenshot and thumbnail image in `/public`


# Adding new theme

Add to 

- src/copy/index.ts
- src/css/index.ts
- startup/src/themeConfig.mts
- resizeImages/public/

If everything went well, you can now run `npm run startup` to generate the images, themes.json.

If that went well, try `npm run build`, this will do the following:
- generate `src/data/generated/themes.ts`
- generate the simple react client in `build/`
- generate a optimized version of the website by running the server's crawl command: `npm run server:crawl`
- Now you can look at the build folder to see the final product
- If you want to test out the final product, run `npm run serve` and click through the website in the browser, this is what the users will see once uploaded to mmcelebration.com, you can view the page source and see that the html is generated for each page. 
