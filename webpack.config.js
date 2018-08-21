const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  mode: 'production',
  entry: path.join(paths.src, 'index.js'),
  output: {
    filename: "./js/[name].js",
    path: paths.dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/i,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loaders: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/i,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(paths.dist),
    new HtmlWebpackPlugin({
      template: path.join(paths.src, "index.html")
    }),
    new MiniCssExtractPlugin()
  ]
};
