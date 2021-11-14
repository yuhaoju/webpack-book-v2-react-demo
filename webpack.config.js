// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

module.exports = () => {
  return {
    entry: {
      index: {
        import: './src/index.jsx',
        dependOn: 'shared',
      },
      details: {
        import: './src/details.jsx',
        dependOn: 'shared',
      },
      shared: ['react', 'react-dom'],
    },
    devServer: {
      open: true,
      port: 3000,
    },
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
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
      extensions: ['.js', '.jsx', '.less'],
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
        filename: '[name].css',
        chunkFilename: '[name].chunk.css',
      }) : null
    ].filter(Boolean)
  };
};
