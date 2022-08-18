const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const glob = require("glob");
const fs = require("fs");
function getEntry(...inputs) {
  const allFiles = glob.sync("*", {
    cwd: path.resolve(process.cwd(), "src", "pages"),
  });
  const dirs = inputs
    .filter((input) => allFiles.includes(input))
    .filter((input) =>
      fs
        .statSync(path.resolve(process.cwd(), "src", "pages", input))
        .isDirectory()
    );
  const entry = {};
  dirs.reduce((previous, current) => {
    previous[current] = path.resolve(process.cwd(), "src", "pages", current);
    return previous;
  }, entry);
  return entry;
}
function getHtmlWebpackPlugins(entries) {
  const plugins = [];
  Object.entries(entries).reduce((previous, current) => {
    const [entry, absolutePath] = current;
    previous.push(
      new htmlWebpackPlugin({
        template: path.resolve(absolutePath, "public", "index.html"),
        chunks: [entry],
        filename: `${entry}/index.html`,
        // publicPath: path.resolve(process.cwd(), "output", entry),
        favicon: path.resolve(__dirname, "src", "assets", "home.ico"),
      })
    );
    return previous;
  }, plugins);
  return plugins;
}
const entries = getEntry(
  "css",
  "opacity",
  "position",
  "requestAnimationFrame",
  "translate"
);
module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "[name]/index-[contenthash].js",
    clean: true,
  },
  mode: "none",
  plugins: [
    ...getHtmlWebpackPlugins(entries),
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/index.html"),
          to: path.resolve(__dirname, "output/index.html"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    port: 7777,
    static: path.resolve(__dirname, "output"),
  },
};
