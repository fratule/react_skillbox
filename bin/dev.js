const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const nodemon = require('nodemon')

const compiler = webpack(webpackConfig)

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error('Compilation failed: ', err.stack || err)

    if (err.details) {
      console.error('Compilation failed details: ', err.details)
    }

    return
  }
  console.log('Compilation was successfully')

  const info = stats.toJson()

  if (stats.hasErrors()) console.error('Stats errors: ', info.errors)
  if (stats.hasWarnings()) console.warn('Stats warinings: ', info.warnings)

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server/'),
      path.resolve(__dirname, '../dist/server/'),
    ],
  })
})
