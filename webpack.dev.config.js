const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const iframedModules = ['green', 'yellow'];

const iframedModulesPluginConfig = iframedModules.map((moduleName) => new HtmlWebpackPlugin({
    filename: `${moduleName}.html`, //relative to root of the application
    chunks: [moduleName],
    excludeAssets: [/.*\.js$/]
}));

const iframedModuleEntries = iframedModules.reduce((entries, moduleName) => ({...entries, [moduleName]: `./modules/${moduleName}`}), {})

const iframedModulePaths = iframedModules.map((moduleName) => path.resolve(__dirname, `modules/${moduleName}`));

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
        ...iframedModuleEntries,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        ...iframedModulesPluginConfig,
        new HtmlWebpackPlugin({
            template: 'main-app.html',
            filename: 'index.html', //relative to root of the application
            chunks: ['main'],
            excludeAssets: [/.*\.css$/]
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
        
    ],
    module: {
        rules: [
            {
              test: /\.css$/,
              include: iframedModulePaths,
              exclude: path.resolve(__dirname, "src/css"),
              use: [
                  {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          hmr: true,
                      }
                  },
                  {loader: "css-loader"},
              ]
            },
            {
                test: /\.css/,
                exclude: iframedModulePaths,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }]
    },
    resolveLoader: {
        alias: {
          text: 'text-loader',
        },
      },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000,
        hot: true,
    },
};