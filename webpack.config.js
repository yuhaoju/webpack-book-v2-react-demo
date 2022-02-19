// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

module.exports = () => {
  return {
    entry: {
      index: {
        import: './src/index.tsx',
        dependOn: 'shared',
      },
      details: {
        import: './src/details.tsx',
        dependOn: 'shared',
      },
      shared: ['react', 'react-dom'],
    },
    output: {
      chunkFilename: isProduction ? '[name].[chunkhash:8].chunk.js' : '[name].chunk.js',
      filename: isProduction ? '[name].[chunkhash:8].js' : '[name].js',
    },
    devServer: {
      open: true,
      port: 3000,
    },
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            }
          }
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.less'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        chunks: ['shared', 'index'],
      }),
      new HtmlWebpackPlugin({
        filename: 'details.html',
        template: 'index.html',
        chunks: ['shared', 'details'],
      }),
      isProduction ? new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      }) : null
    ].filter(Boolean)
  };
};
