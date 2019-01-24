const Router = require('koa-router');
const userController = require('./../controller/user.js');
const menuController = require('./../controller/menu.js');
const userMenuController = require('./../controller/userMenu.js');
const systemController = require('./../controller/system.js');
const checkHeaderPermission = require('./../../library/checkHeader.js');

module.exports = function() {
    let router = new Router();

    // 用户登录
    router.post('/api/user/login', userController.login);

    // 用户注册
    router.post('/api/user/sign',  userController.sign);

    // 用户重置密码
    router.post('/api/user/reset_password', userController.resetPassword);

    // 用户重置密码
    router.get('/api/user/info', checkHeaderPermission.checkHeader, userController.getUserInfo);

    // 批量改变菜单接口
    router.get('/api/menu/create', menuController.batchInsertMenu);

    // 获取菜单列表
    router.get('/api/menus', checkHeaderPermission.checkHeader, menuController.getMenuList);

    // 获取用户点餐列表
    router.get('/api/menu/user_orders', checkHeaderPermission.checkHeader, userMenuController.getOrderInfoList);

    // 用户点餐
    router.post('/api/user/order', checkHeaderPermission.checkHeader, userMenuController.userOrder);

    // 用户是否点餐
    router.get('/api/user/order', checkHeaderPermission.checkHeader, userMenuController.getUserOrderStatus);
    
     // 用户改变订餐
    router.put('/api/user/order', checkHeaderPermission.checkHeader, userMenuController.resetUserOrder);

    // 管理员更改开关
    router.post('/api/system/is_open', checkHeaderPermission.checkHeader, systemController.changeSystemOpen);

    // 管理员获取开关状态
    router.get('/api/system/is_open', checkHeaderPermission.checkHeader, systemController.getSystemInfo);

    return router;
}