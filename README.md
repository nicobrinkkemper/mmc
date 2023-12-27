# The Official Mario Maker Celebration Repository

## What's MMC?
The best Mario Makers from around the world showcase their style.

[Official site](https://mmcelebration.com)
[Github pages (latest)](https://nicobrinkkemper.github.io/mmc)

## Shown so far
- 4YMM
- 5YMM/6YMM
- 7MMC
- 8MMC

## Startup
- resize images
- download and parse csv
- combine image and csv data
- check existence of needed level, maker, thumbnail
- output `themes.json` in convenient format for react

## React app
It uses the following url routing
/[theme]/levels/[batch]/[level]


## Post build
Every page of the website gets crawled via react snap package. It creates a html file for every route.
This gives a few benefits:
- Seo/Meta tags on a page by page basis
- Decrease time to first paint

## Themes.json
Typescript infers the themes.json file that is build during startup.
Get the data for the current theme
```
const {data} = useTheme();
// it includes everything
```

Get the data for the current batch/level number in URL
```
const {batch, level} = useLevel();
```
