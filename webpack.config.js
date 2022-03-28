const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    pageOne: "./index.js",
    pageTwo: "./bundle.js",
  },
  output: {
    path: path.resolve(__dirname, "webpackDist2"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["pageOne"],
      favicon: "./img/logo64.png",
      // inject: true
    }),
    new HtmlWebpackPlugin({
      filename: "all-work.html",
      template: "./all-work.html",
      chunks: ["pageTwo"],
      // inject: true
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./img/all-work-images/original", to: "./imgs" }],
    }),
    new CopyPlugin({
      patterns: [{ from: "./manifest.json", to: "./" }],
    }),
    new workboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.DS*/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ["url-loader?limit=100000"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "./imgs",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "webpackDist2"),
    https: true,
    compress: true,
    port: 9000,
  },
};
