const path = require('path');

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
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },{
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