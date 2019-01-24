const Koa = require('koa');
const app = new Koa();
const config = require('./config/config.js');
var cors = require('koa-cors');
app.use(cors());


/**
 * 添加报文解析中间件
 */
const bodyParser = require('koa-bodyparser');
const xmlParser = require('koa-xml-body');
app.use(xmlParser());
app.use(bodyParser());

/**
 * 处理输入报文中间件
 */
app.use(require('./middleware/input.js'));

/**
 * 处理header中间件
 */
app.use(require('./middleware/header.js'));

/**
 * 请求回调处理中间件
 */
app.use(require('./middleware/requestError.js'));

/**
 * 加载路由
 * 路由配置在config/config.js中 routes 数组中
 */
let routes = config.routes;
for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
        let element = routes[key];
        let router = require(element)();
        app.use(router.routes());
    }
}


app.listen(config.port);
module.exports = app;