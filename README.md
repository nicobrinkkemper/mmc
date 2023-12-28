# The Official Mario Maker Celebration Repository

The best Mario Makers from around the world showcase their style.

[Official site](https://mmcelebration.com)

[Github hosted (latest)](https://nicobrinkkemper.github.io/mmc)

- [/4ymm](https://mmcelebration.com/4ymm)
- [/5ymm](https://mmcelebration.com/5ymm)
- [/6ymm](https://mmcelebration.com/6ymm)
- [/7mmc](https://mmcelebration.com/7mmc)
- [/8mmc](https://mmcelebration.com/8mmc)


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
export * as _6ymm from "./6ymm";
export * as _7mmc from "./7mmc";
export * as _8mmc from "./8mmc";
export * as _default from "./default";
```
The welcome, about and credit contents are exported here.
```tsx
const WelcomeContent = useContent('WelcomeContent');
// later
<WelcomeContent />
```