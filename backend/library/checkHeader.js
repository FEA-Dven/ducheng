const userValidation = require('./../app/validation/user.js');
const validator = require('./../util/requestValidator.js');
const db = require('./db.js');
const foodKeyDefines = require('./foodDefines.js');
const ApiError = require('./apiError.js');
const UTIL = require('./../util/utils.js');

module.exports = {
    /**
    * @author dven 
    * @description 校验请求头，判断传过来的token和fid是否相等 
    */
    checkHeader: async function(ctx, next) {
        await validator.validate(
            ctx.headerInput,
            userValidation.checkHeader.schema,
            userValidation.checkHeader.options
        )
        let cacheUserInfo = await db.redis.get(foodKeyDefines.userInfoCacheKey(ctx.headerInput.fid))
        cacheUserInfo = UTIL.jsonParse(cacheUserInfo);
        // 如果没有redis层用户信息和token信息不对称，需要用户重新登录
        if (!cacheUserInfo || ctx.headerInput.token !== cacheUserInfo.token) {
            throw new ApiError('food.userAccessTokenForbidden');
        }
        await next();
    }
}