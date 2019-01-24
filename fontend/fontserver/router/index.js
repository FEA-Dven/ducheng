const Router = require('koa-router')
const food = require('../controller/food.js')

module.exports = function () {
  var router = new Router({})

  // 会员中心页面
  router.get('/food/*', food.index)
  return router
}

