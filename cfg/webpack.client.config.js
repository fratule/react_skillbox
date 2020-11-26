const path= require('path')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'

/**
 * Get the correct devtoll settings
 *  - in prod false
 *  - in dev eval
 */
const setDevtool = () => {
  if (IS_DEV) return 'eval'
  if (IS_PROD) return false
}

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js'
  },
  resolve: {
    extensions: [ '.json', '.js', '.jsx', '.ts', '.tsx' ],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      }
    ],
  },
  devtool: setDevtool(),
}
