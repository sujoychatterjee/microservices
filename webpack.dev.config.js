const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// function recursiveIssuer(m) {
//   // console.log(Object.keys(m));
//   console.log('-------------------')
//   console.log(m.constructor.resource);
//   console.log(m.resource);
//   console.log('-------------------')
//   return true;
// }


function recursiveIssuer(m, c) {
  console.log(c && c[0]);
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    console.log(m.name);
    return m.name;
  } else {
    console.log('not fouind');
    return false;
  }
}

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
        blue: './modules/blue',
        green: './modules/green',
    },
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
            // {
            //     test: /\.css$/,
            //     include: path.resolve(__dirname, "modules/blue"),
            //     exclude: path.resolve(__dirname, "src/css"),
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //         },
            //         {loader: "css-loader"},
            //     ]
            // },
            {
              test: /\.css$/,
              include: [path.resolve(__dirname, "modules/blue"), path.resolve(__dirname, "modules/green")],
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
                exclude: [path.resolve(__dirname, "modules/blue"), path.resolve(__dirname, "modules/green")],
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
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000,
        hot: true,
    },
};