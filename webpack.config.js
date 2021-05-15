/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const templates = require('./nunjuckspages');

module.exports = env => {
  const devMode = !env || !env.production;

  return {
    mode: devMode ? 'development' : 'production',
    entry: {
      main: './src/index.js',
      baseComponents: './src/components.js',
      vendor: './src/vendor.js',
      polyfills: './src/polyfills.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'assets/js/[name].js',
      library: '[name]Module'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ]
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
        },
        {
          test: /\.njk$/,
          use: [
            {
              loader: 'simple-nunjucks-loader',
              options: {
                searchPaths: [ path.resolve('./templates') ]
              }
            }
          ]
        }
      ]
    },
    stats: {
      colors: true
    },
    devtool: 'source-map',
    plugins: [
      new webpack.ProgressPlugin(),
      ...(devMode ? [] : [new CleanWebpackPlugin()]),
      ...templates.map(template => new HTMLWebpackPlugin(template)),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css'
      }),
      new StyleLintPlugin({
        files: 'scss/**/*.(s(c|a)ss|css)'
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      }),
      new ExtraWatchWebpackPlugin({
        dirs: [path.resolve('templates')]
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets/**/*', to: '.', noErrorOnMissing: true}
        ]
      })
    ],
    optimization: {
      minimize: !devMode,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: true
        }),
        new CssMinimizerPlugin()
      ]
    }
  };
};
