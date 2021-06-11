import path from 'path';
import chalk from 'chalk';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import JavascriptObfuscator from 'webpack-obfuscator';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { baseConfig, JavascriptObfuscatorOption } from './webpack.config';
import { HOST, PORT } from './config';

const commonConfig: Configuration = merge(baseConfig, {
  entry: {
    index: path.resolve(__dirname, '../src/renderer/index.tsx'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/renderer'),
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff2?)/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: false,
      template: path.resolve(__dirname, '../src/renderer/index.html'),
    }),
    /** 拷贝静态资源 */
    // new CopyWebpackPlugin({
    //   patterns: [{ from: 'node_modules/@auto.pro/webview/src/index.js', to: 'static/webview.js' }],
    // }),
    new FriendlyErrorsWebpackPlugin(),
  ],
});

export default (env, { mode }): Configuration => {
  const devConfig: Configuration = {
    devtool: 'source-map',
    devServer: {
      contentBase: 'renderer',
      hot: true,
      host: '0.0.0.0',
      port: PORT,
      clientLogLevel: 'none',
      noInfo: true,
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 2 },
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 2 },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebpackBar({
        reporter: [
          {
            afterAllDone() {
              if (!env.web && env !== 'web') {
                return;
              }
              console.log(
                chalk.bgBlue(` ${chalk.black('INFO')} `) +
                  chalk.white(' Your App is running at: \n\n') +
                  chalk.green(`     IPv4:  http://127.0.0.1:${PORT}\n`) +
                  chalk.green(`            http://${HOST}:${PORT}\n`),
              );
            },
          },
        ],
      }),
    ],
  };

  const prodConfig: Configuration = {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            {
              loader: 'css-loader',
              options: { sourceMap: false, importLoaders: 2 },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: false, importLoaders: 2 },
            },
          ],
        },
      ],
    },
    stats: {
      chunks: true,
    },
    optimization: {
      minimize: true,
      moduleIds: 'deterministic',
      runtimeChunk: false,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 2,
        maxAsyncRequests: 6,
        maxInitialRequests: 6,
        name: false,
        cacheGroups: {
          polyfill: {
            test: /[\\/]node_modules[\\/](core-js|@babel|regenerator-runtime)/,
            name: 'polyfill',
            priority: 70,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom)/,
            priority: 20,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
      }),
      new JavascriptObfuscator({
        ...JavascriptObfuscatorOption,
        target: 'browser',
      }),
      new WebpackBar({}),
    ],
  };

  const config = merge(commonConfig, mode === 'development' ? devConfig : prodConfig);
  return config;
};
