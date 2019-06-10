/**
 * errorName: {code, message, status}
 * 错误名: {错误码, 错误信息, http状态码}
 */
const defines = {
    
    'common.all': {code: 1000, message: '%s', status: 500},
    'request.paramError': {code: 1001, message: '参数错误 %s', status: 200},
    'access.forbidden': {code: 1010, message: '没有操作权限', status: 403},
    'auth.notPermission': {code: 1011, message: '授权失败 %s', status: 403},
    'role.notExist': {code: 1012, message: '角色不存在', status: 403},
    'auth.codeExpired': {code: 1013, message: '授权码已失效', status: 403},
    'auth.codeError': {code: 1014, message: '授权码错误', status: 403},
    'auth.pargramNotExist': {code: 1015, message: '程序不存在', status: 403},
    'auth.pargramSecretError': {code: 1016, message: '程序秘钥错误', status: 403},
    'auth.pargramSecretEmpty': {code: 1016, message: '程序秘钥为空，请后台配置', status: 403},

    'db.queryError': { code: 1100, message: '数据库查询异常', status: 500 },
    'db.insertError': { code: 1101, message: '数据库写入异常', status: 500 },
    'db.updateError': { code: 1102, message: '数据库更新异常', status: 500 },
    'db.deleteError': { code: 1103, message: '数据库删除异常', status: 500 },

    'redis.setError': { code: 1104, message: 'redis设置异常', status: 500 },

    'food.illegalUser' : {code: 1201, message: '非法用户', status: 403},
    'food.userHasExist' : {code: 1202, message: '用户已经存在', status: 200},
    'food.objectNotExist' : {code: 1203, message: '%s', status: 200},
    'food.insertMenuError': {code: 1204, message: '批量插入菜单失败', status: 200},
    'food.userNameInvalid': {code: 1205, message: '我不信你叫这个名字', status: 200},
    'food.userOrderAlready': {code: 1206, message: '您已经定过餐了', status: 200},
    'food.userNotOrderToday': {code: 1207, message: '您今天还没有订餐', status: 200},
    'food.orderIsEnd': {code: 1208, message: '订餐已经截止了，欢迎下次光临', status: 200},
    'food.blackHouse': {code: 1209, message: '别搞太多骚操作', status: 200},
    'food.userAccessTokenForbidden': { code: 1210, message: 'token失效', status: 403 },
    'food.userHasStared': { code: 1211, message: '此评论您已点过赞', status: 200 },
    'food.canNotReplySelf': { code: 1212, message: '不能回复自己的评论', status: 200 },
    'food.overReplyLimit': { code: 1213, message: '回复评论数已超过%s条，不能再回复', status: 200 }
};

module.exports = function (errorName, params) {
    if(defines[errorName]) {
        let result = {
            code: defines[errorName].code,
            message: defines[errorName].message,
            status: defines[errorName].status
        };

        params.forEach(element => {
            result.message = (result.message).replace('%s', element);
        });

        return result;
    }
    
    return {
        code: 1000,
        message: '服务器内部错误',
        status: 500
    };
}