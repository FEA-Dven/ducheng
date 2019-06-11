const Router = require('koa-router');
const userController = require('./../controller/user.js');
const menuController = require('./../controller/menu.js');
const userMenuController = require('./../controller/userMenu.js');
const systemController = require('./../controller/system.js');
const routePermission = require('../../middleware/routePermission.js');
const commentController = require('./../controller/comment.js');

module.exports = function() {
    let router = new Router();

    // 用户登录
    router.post('/api/user/login', userController.login);

    // 用户注册
    router.post('/api/user/sign',  userController.sign);

    // 用户重置密码
    router.post('/api/user/reset_password', userController.resetPassword);

    // 用户重置密码
    router.get('/api/user/info', routePermission.checkHeader, userController.getUserInfo);

    // 批量改变菜单接口
    router.get('/api/menu/create', menuController.batchInsertMenu);

    // 获取菜单列表
    router.get('/api/menus', routePermission.checkHeader, menuController.getMenuList);

    // 获取用户点餐列表
    router.get('/api/menu/user_orders', routePermission.checkHeader, userMenuController.getOrderInfoList);

    // 用户点餐
    router.post('/api/user/order', routePermission.checkHeader, userMenuController.userOrder);

    // 用户是否点餐
    router.get('/api/user/order', routePermission.checkHeader, userMenuController.getUserOrderStatus);
    
     // 用户改变订餐
    router.put('/api/user/order', routePermission.checkHeader, userMenuController.resetUserOrder);

    // 管理员更改开关
    router.post('/api/system/is_open', routePermission.checkHeader, systemController.changeSystemOpen);

    // 管理员获取开关状态
    router.get('/api/system/is_open', routePermission.checkHeader, systemController.getSystemInfo);

    // 用户发表评论
    router.post('/api/user/send/comment', routePermission.checkHeader, commentController.sendComment);

    // 用户回复评论
    router.post('/api/user/:comment_fid/comment/:comment_id/reply', routePermission.checkHeader, commentController.replyComment);

    // 用户点赞
    router.post('/api/user/:comment_fid/comment/:comment_id/star', routePermission.checkHeader, commentController.starComment);

    // 获取用户评论列表
    router.get('/api/comment/list', routePermission.checkHeader, commentController.getCommentList);

    // 管理员删除评论
    router.delete('/api/comment/:comment_id/delete', routePermission.checkHeader, commentController.deleteComment);

    return router;
}