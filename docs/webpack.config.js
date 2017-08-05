const path = require('path');
const getRepositoryName = require('git-repo-name').sync;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const SETTINGS = require('./settings');

const production = process.env.NODE_ENV === 'production';

const stylesLoaders = [
  'css-loader',
  { loader: 'postcss-loader', options: { config: { path: path.join(__dirname, 'postcss-config.js') } } },
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.join(__dirname, 'src/styles/variables.scss'),
        path.join(__dirname, 'src/styles/mixins.scss'),
      ],
    },
  },
];

const loaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: path.join(__dirname, 'src'),
    exclude: /node_modules/,
  },

  {
    test: /\.(css|scss)$/,
    loader: production
      ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: stylesLoaders })
      : ['style-loader', ...stylesLoaders],
  },

  {
    test: /\.(svg|png|jpg|gif|woff|woff2|otf|ttf|eot)$/,
    loader: 'file-loader',
  },
];

const pluginsBase = [
  new HtmlWebpackPlugin({ template: path.join(__dirname, 'template.ejs') }),

  new FaviconsWebpackPlugin({
    logo: path.join(__dirname, 'favicon.png'),
    background: SETTINGS.THEME_COLOR,
    icons: SETTINGS.FAVICONS,
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
    },
  }),
];

const developmentPlugins = [
  ...pluginsBase,
  new webpack.HotModuleReplacementPlugin(),
  new OpenBrowserPlugin({ url: `http://localhost:${SETTINGS.PORT}` }),
];

const productionPlugins = [
  ...pluginsBase,
  new ExtractTextPlugin('[name].css'),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: false,
      warnings: false,
      drop_console: true,
      unsafe: true,
    },
  }),
];

module.exports = {
  devtool: production ? 'cheap-module-source-map' : 'eval',

  entry: production
    ? path.join(__dirname, 'src/index')
    : [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${SETTINGS.PORT}`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src/index'),
    ],

  output: {
    path: SETTINGS.PUBLIC_PATH,
    filename: 'bundle.js',
    publicPath: production ? `/${getRepositoryName()}/` : '/',
  },

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
  },

  module: { loaders },
  plugins: production ? productionPlugins : developmentPlugins,
};
