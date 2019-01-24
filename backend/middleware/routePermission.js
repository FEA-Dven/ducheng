const ApiError = require('./../library/apiError.js');
const logger = require('./../util/logger.js');


/**
 * 路由权限校验中间件
 * @param {string} resource 资源 
 */

 /**
  * permissions配置
  * 资源(resource): {角色 role: ['role1', 'role2', ...], 
  *                 动作 actions: ['get', 'post', ...],
  *                 权限所属关系 relations: ['role', 'owner']}
  * role: public 公共权限, private 私有权限, protect 保护权限; 
  * actions: get, post, put, delete;
  * relations: role 当前角色操作权限, owner 当前用户操作权限; team 当前团队成员才有操作权限 (此参数可不设置，表示不用校验权限)
  */
const permissions = {
    "tests": {role: ['public'], actions: ['get']},
    "tests": {role: ['private'], actions: ['post', 'put', 'delete'], relations: ['owner']}
};

module.exports = function (resource) {
    /**
     * 校验token
     */
    async function checkToken(ctx) {
        let routeUid = ctx.params.uid;
        let headerUid = ctx.headers.uid;
        let headerToken = ctx.headers.token;

        // console.log(routeUid, headerUid, headerToken, !routeUid);
        // throw new ApiError('auth.notPermission');
    }

    return async function(ctx, next) {
        let permission = permissions[resource];
        if (!permission) {
            throw new ApiError('role.notExist');
        }

        if (permission.role.indexOf('public') >= 0) {
            await next();
            return true;
        }

        await checkToken(ctx);


        await next();
    };
};