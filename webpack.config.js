const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "requestAnimationFrame", "index.js"),
  },
  output: {
    path: path.resolve(
      __dirname,
      "src",
      "requestAnimationFrame",
      "output",
    ),
    filename: "index.bundle.js",
    clean:true,
  },
  mode: "none",
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "src/requestAnimationFrame/public",
        "index.html"
      ),
      favicon: "./src/requestAnimationFrame/public/home.ico",
    }),
    // new copyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src/requestAnimationFrame/public/home.ico"),
    //       to: path.resolve(__dirname, "src/requestAnimationFrame/output/home.ico"),
    //     },
    //   ],
    // }),
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
  devServer:{
    port:7777,
    static:path.resolve(__dirname, "src", "requestAnimationFrame", "output"),
  }
};
