module.exports = {
  devtool: "source-map",
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "main.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?presets[]=es2015"
      }
    ]
  }
};