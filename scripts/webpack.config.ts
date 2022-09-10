import * as path from "path";
import * as webpack from "webpack";
import * as fs from "fs";

const levelsDir = path.join(__dirname, "levels");
const makersDir = path.join(__dirname, "makers");
const levels = fs.readdirSync(levelsDir).map(v => levelsDir + "/" + v);
const makers = fs.readdirSync(makersDir).map(v => makersDir + "/" + v);
const configLevels: webpack.Configuration = {
  mode: "production",
  entry: levels,
  output: {
    path: path.resolve(__dirname, "levelImages"),
    libraryTarget: "umd",
    libraryExport: "default",
    library: "levelImages",
    filename: "levelImages.bundle.js"
  },
  resolve: {
    extensions: [".png",".jpg"]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        include: [levelsDir],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name]-[width].webp",
              sizes: [500, 250],
              fallback: require.resolve("responsive-loader"),
              fallbackOptions: {
                  adapter: require("responsive-loader/sharp"),
                  format:'webp'
              }
            }
          }
        ]
      }
    ]
  }
};

const configMakers: webpack.Configuration = {
  mode: "production",
  entry: makers,
  output: {
    path: path.resolve(__dirname, "makerImages"),
    libraryTarget: "umd",
    libraryExport: "default",
    library: "makerImages",
    filename: "makerImages.bundle.js"
  },
  resolve: {
    extensions: [".png",".jpg"]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        include: [makersDir],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name]-[width].webp",
              sizes: [500, 250],
              fallback: require.resolve("responsive-loader"),
              fallbackOptions: {
                  adapter: require("responsive-loader/sharp"),
                  format:'webp'
              }
            }
          }
        ]
      }
    ]
  }
};
const exportIfAvailable = [];
if (levels.length) exportIfAvailable.push(configLevels);
if (makers.length) exportIfAvailable.push(configMakers);
export default exportIfAvailable;
