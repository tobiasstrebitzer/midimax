const path = require('path')

module.exports = {
  entry: './src/web/midimax.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'midimax.js',
    path: path.resolve(__dirname, 'dist')
  }
}
