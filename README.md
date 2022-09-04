## Prerequisites
- Have `npm` installed. It comes with Node.js which you can install from their site https://nodejs.org/en/
## Installing

- `npm install` - install all dependencies in `node_modules`
- `npm run start` - run development mode
- OR `npm run build` - build final product in `build folder`
- OR `npm run test` - test if everything is working

## Deploying strategy

To build the site, run: `npm run build`. The contents of the build folder need to be uploaded.

 After a `build` navigatable pages will be pre-rendered and saved to html inside the `/build` folder. Levels that are not released will not be pre-rendered.

This site is designed to run without any server-side scripting. It can be deployed to any server that hosts simple static files. The site works best when the server passes through pages that exist, but redirect to homepage when they do not. This can be achieved through .htaccess or other means depending on the server:
```
<ifModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule (.*) index.html [QSA,L]
</ifModule>
```

## Building with Docker

If you don't wish to deal with installing node, you can use Docker instead. The dockerfile isn't used for deploying, yet.
Install docker (ie. docker for desktop) and run command:
```
docker compose up -d
```
You can now visit [localhost:8080](http://localhost:8080)
The first time can take a while, after that it should start quickly. To rebuild the website from scratch, run 
```
docker compose up -d --build
```
To extract the build contents to work with them locally, for example to upload somewhere else, run:
```
docker cp fiveymm:/usr/local/apache2/htdocs ./docker-build
```
This will copy the site to `./docker-build` folder

## Update level codes
We update the CSV with level codes and descriptions every Sunday before 15:00 GMT. To see the dates for each batch, see file `src/useLevelData.ts`. 
- download csv or ctl+A ctl+C the master spreadsheet
- replace csv in `src/data` (simply copy paste the whole document so you don't have to mess with filenames)
- Type `npm run csvtojson`, this is also ran once whenever you `start` or `build`.

## Add images
- Download maker images from drive
- Download level images from drive
- Add new images to `scripts/levels` and `scripts/makers`
- `npm run build:images` this command generates all the images and puts it in `scripts/levelImages` and `scripts/makerImages`
- `npm run move:images` this command moves over folders `makerImages` and `levelImages` to `public folder` and removes the js files in those folders

## Change copy
- Download `.mdx` file  from drive
- Replace `.mdx` file in `src/data`

## Upload with FTP
- `npm run build`
- upload build folder to ftp with your preferred FTP program
- Be careful! Hashes might change for bundled css and js. Make sure they are the same, or simply upload the whole static folder along with all html files.

## General information about the source code

See below `Available Scripts` to get you up and running. These scripts correspond to the ones specified in `package.json`. A few things to keep in mind before starting the work on the project:

- Only the build folder must be uploaded to the server, do not include any other files. Changes to the site can only be done by running `npm run build` and reuploading the `build` folder's contents to the server.

- The final build of the `React` app is not connected with any API or external data file. All data must be present during the buildstep, and all data will be included in the Javascript bundle. 

- The files ending with `.mdx` located in `src/data` can be used to update the copy of the website. These files work the same as the `.csv` file located in `src/data`, meaning the `.mdx` files are also incoorporated in the final bundle in the `build` folder. You can find these files on the Google Drive.

- Futher changes to release dates and level data can be made in the file `src/useLevelData.ts`. This file acts as a sort-of runtime database, and offers some uttility functions to extract meaningfull data from the `.csv` file. Components of the App use this file to statically import data from the spreadsheet. (no async stuff whatsoever) Any date changed here will reflect when each batch will be released, and may be changed individually. This can be usefull to preview the site, by changing the dates you are able to see how things will look like once the levels are released.

- Changes to files in `src/data` will not be reflected in development mode. However you do not have to restart the process of `npm run start`, you can simply do a save command on any of the `.ts` or `.tsx` files, and the change to the data will be reflected automatically. This is a minor annoyance to watch out for when changing files in the `src/data` folder.

- Images of levels and Miis can be automatically generated with the command `npm run build:images`. This will create the folder `scripts/makerImages` and `scripts/levelImages` from the original images located in `scripts/makers` and `scripts/levels`. The filenames must correspond with the levels names using the snake_case format. The contents of the generated folders must be copied over to the `public` directory. The generated `*Images.bundle.js` files are not needed and may be deleted/not copied over. You can find the original images on the Google Drive. If there are new images here, place them in `scripts/makers` and `scripts/levels` respectively, then run the command `npm run build:images`, and copy over the generated images to the `public` folder.

- To copy over images to the public folder and delete the redundant javascript files in the image folders, you can run the command `npm run move:images`. This command only works on unix machines. This should be the only command that doesn't work on Window's commandline. If you insist on working on Windows, this step should be performed manually, or WSL should be used. (I recommend WSL for Windows users)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

(Currently only the default create-react-app test is there)

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run images`

Combines both build and move images step as a simple command that will fix all the maker and level images. 

### `npm run build:images`

This is a custom script to resize and compress all the images needed for the levels and Miis. Run this command, then copy over all the images to the public folder. You do not need the .js bundles in these folders, feel free to remove.

### `npm run move:images`

This is a unix command to remove all the unneccary Javascript files and move all the generated images to the public folder.

### `npm run serve`

This will start a server running on the `build` folder. This will reflect more accurately the final product of the site, but does not allow hot-reloading like `npm run start` does.

### `npm run never_run_eject_please`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Other versions
For 4YMM, see https://github.com/nicobrinkkemper/4ymm
For 5 and 6YMM, see https://github.com/nicobrinkkemper/fiveymm


