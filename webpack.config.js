const path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.ts',

  output: {
    path: path.join(__dirname, "docs"),
    filename: "main.js"
  },

  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader'
    }]
  },
  resolve: {
    modules: [
      "node_modules",
    ],
    extensions: [
      '.ts',
      '.js'
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "docs"),
    },
    open: true
  },
};