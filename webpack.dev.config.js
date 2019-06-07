const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const modules = ['green', 'blue'];

const modulesPluginConfig = modules.map((moduleName) => new HtmlWebpackPlugin({
    filename: `${moduleName}.html`, //relative to root of the application
    chunks: [moduleName],
    excludeAssets: [/.*\.js$/]
}));

const moduleEntries = modules.reduce((entries, moduleName) => ({...entries, [moduleName]: `./modules/${moduleName}`}), {})

const modulePaths = modules.map((moduleName) => path.resolve(__dirname, `modules/${moduleName}`));

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
        ...moduleEntries,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        ...modulesPluginConfig,
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
              include: modulePaths,
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
                exclude: modulePaths,
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