const request = require('request')
const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config')

const app = new Koa()
const router = new Router()
const DEVPORT = 3001

router.get('/', async function (ctx) {
  await send(ctx, 'demo/index.html')
})

router.get('**/react.min.js', async function (ctx) {
  await send(ctx, 'demo/react-with-addons.js')
})
router.get('**/react-dom.min.js', async function (ctx) {
  await send(ctx, 'demo/react-dom.js')
})
//
router.get('**/*.js(on)?', async function (ctx) {
  const options = {
    uri: `http://localhost:${DEVPORT}/${ctx.url}`,
    mothed: 'GET',
  }
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = request(options)
})

app.use(router.routes())

app.listen(3000, function () {
  console.log('server running on http://localhost:3000')
})

// webpack serve==============
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  }
}).listen(DEVPORT, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }
})