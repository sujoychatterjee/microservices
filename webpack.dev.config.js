const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src/js/modules/content/blue"),
                exclude: path.resolve(__dirname, "src/css"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {loader: "css-loader"},
                ]
            },

            {
                test: /\.css/,
                exclude: [path.resolve(__dirname, "src/js/modules/content/blue")],
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
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000,
        hot: true,
    },
};