import path from 'path';
import JavascriptObfuscator from 'webpack-obfuscator';
import AutoProWebpackPlugin from '@auto.pro/webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import { baseConfig, JavascriptObfuscatorOption } from './webpack.config';

const commonConfig: Configuration = merge(baseConfig, {
  entry: {
    app: path.resolve(__dirname, '../src/index'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    // libraryTarget: 'var',
    // libraryTarget: "commonjs2"
  },
  target: 'node',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!renderer/**'],
    }),
    new (AutoProWebpackPlugin as any)({
      ui: ['app'],
      // entry: {
      //     key: ''
      // }
    }),
    /** 拷贝静态资源 */
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'assets', to: 'assets', context: 'src' }
    //   ],
    // }),
  ],
});

export default (env, { mode }): Configuration => {
  process.env.NODE_ENV = mode;

  const devConfig: Configuration = {
    devtool: 'source-map',
  };

  const prodConfig: Configuration = {
    stats: {
      chunks: true,
    },
    optimization: {
      minimize: true,
      moduleIds: 'deterministic',
      runtimeChunk: false,
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
      ],
    },
    plugins: [
      new JavascriptObfuscator({
        ...JavascriptObfuscatorOption,
        target: 'node',
      }),
    ],
  };

  const config = merge(commonConfig, mode === 'development' ? devConfig : prodConfig);
  return config;
};
