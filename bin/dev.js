const path = require('path')
const express = require('express')
const nodemon = require('nodemon')
const webpack = require('webpack')
const [
  webpackClientConfig,
  webpackServerConfig,
] = require('../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

// HMR
const hmrServer = express()
const port = 3001
const clientCompiler = webpack(webpackClientConfig)

hmrServer.use(
  webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: {
      ignore: /dist/,
    },
  }),
)

hmrServer.use(
  webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
  }),
)

hmrServer.listen(port, () => {
  console.log(`HMR server successfully started on ${port} port.`)
})

// Server
const serverCompiler = webpack(webpackServerConfig)

serverCompiler.watch({}, (err, stats) => {
  if (err) {
    console.error('Compilation failed: ', err.stack || err)
    return
  }
  console.log('Compilation was successfully')

  const info = stats.toJson()

  if (stats.hasErrors()) console.error('Stats errors: ', info.errors)
  if (stats.hasWarnings()) console.warn('Stats warnings: ', info.warnings)
})

nodemon({
  script: path.resolve(__dirname, '../dist/server/server.js'),
  watch: [
    path.resolve(__dirname, '../dist/server/'),
    path.resolve(__dirname, '../dist/client/'),
  ],
})
  .on('start', function () {
    console.log('App has started')
  })
  .on('quit', function () {
    console.log('App has quit')
    process.exit()
  })
  .on('restart', function (files) {
    console.log('App restarted due to: ', files)
  })
