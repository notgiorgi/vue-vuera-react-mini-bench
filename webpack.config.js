const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const babelConfig = require('./.babelrc.js')

module.exports = {
  mode: 'production',
  entry: {
    JustReact: path.join(__dirname, './JustReact.js'),
    ReactAndVuera: path.join(__dirname, './ReactAndVuera.js'),
    PlainReactAndVue: path.join(__dirname, './PlainReactAndVue.js'),
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
}
