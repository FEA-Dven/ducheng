const Koa = require('koa')
const app = new Koa()
const xtpl = require('koa-xtpl')
const open = require('open')
const bodyParser = require('koa-bodyparser')
// const static = require('koa-static')
const Router = require('./router')()
const path = require('path')
const config = require('./config/config.js')
const webpackConfig = require('../webpack.config.js')
process.env.NODE_ENV = process.env.NODE_ENV||'dev';
const isDev = process.env.NODE_ENV == 'dev';
const isProd = process.env.NODE_ENV == 'prod';

const staticPath = path.resolve('app/assets') //图片等静态资源绝对路径

const buildPath = path.join(__dirname, '../build/') //打包后目录

app.use(bodyParser()) //在ctx中加body

/**
 * 把当前启动环境挂在config上
 */
app.use(async function(ctx, next) {
    const env = isProd ? 'prod' : 'test'
    config.env = env
    await next()
})
if (isDev) {
    let koaWebpack = require('koa-webpack-middleware')
    let devMiddleware = koaWebpack.devMiddleware
    let hotMiddleware = koaWebpack.hotMiddleware
    let clientCompiler = require('webpack')(webpackConfig)
    app.use(devMiddleware(clientCompiler, {
        stats: {
            colors: true
        },
        publicPath: webpackConfig.output.publicPath,
    }))
    app.use(hotMiddleware(clientCompiler))
}

app.use(async function(ctx, next) { //设置环境和打包资源路径
    if (isDev) {
        let assets ={}
        const publicPath = webpackConfig.output.publicPath
        assets.food = { js : publicPath + `food.js` }
        ctx.assets = assets
    } else {
        ctx.assets = require('../build/assets.json')
    }
    await next()
})


//解析xtpl
app.use(xtpl({
  root: config.views,
}))

//初始化路由
app.use(Router.routes()).use(Router.allowedMethods());

app.listen(config.port, () => console.log(`==> Listening at http://localhost:${config.port}`))

