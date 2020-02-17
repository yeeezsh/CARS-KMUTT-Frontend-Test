/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index',
  // devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      Models: path.resolve(__dirname, 'src/models'),
      Assets: path.resolve(__dirname, 'src/assets'),
      Components: path.resolve(__dirname, 'src/components'),
      Pages: path.resolve(__dirname, 'src/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|th/),
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        // sourceMap: true,
        extractComments: 'all',
      }),
    ],
  },
};
