const path = require("path");

module.exports = {
  entry: "./server.js",
  mode: "development",
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.[tj]sx?$/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      url: require.resolve("url/"),
      path: require.resolve("path-browserify"),
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
      fs: false,
      querystring: require.resolve("querystring-es3"),
      zlib: require.resolve("browserify-zlib"),
      zlib: false,
      http: require.resolve("stream-http"),
      http: false,
      crypto: require.resolve("crypto-browserify"),
      net: require.resolve("net-browserify"),
      os: require.resolve("os-browserify/browser"),
      os: false,
    },
  },
  externals: {
    express: "express",
  },
};
