const path = require('path');
const multi = require('multi-loader');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src/js/modules/content/blue"),
                exclude: path.resolve(__dirname, "src/css"),
                use: [
                    {loader: "to-string-loader"},
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