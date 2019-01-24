const userValidation = require('./../validation/user.js');
const response = require('../../util/response.js');
const validator = require('../../util/requestValidator.js');
const userService = require('./../service/user.js');
const foodDefines = require('./../../library/foodDefines.js');
const db = require('./../../library/db.js');

module.exports = {
    /**
    * @author dven 
    * @description 用户登录 
    */
    login: async function(ctx, next) {
        await validator.validate(
            ctx.input,
            userValidation.login.schema,
            userValidation.login.options
        )
        let res = await userService.login(ctx.input);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 用户注册
    */
    sign: async function(ctx, next) {
        await validator.validate(
            ctx.input,
            userValidation.register.schema,
            userValidation.register.options
        )
        let res = await userService.sign(ctx.input);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 用户重置密码
    */
    resetPassword: async function(ctx, next) {
        await validator.validate(
            ctx.input,
            userValidation.resetPassword.schema,
            userValidation.resetPassword.options
        )
        let res = await userService.resetPassword(ctx.input);

        return response.map(ctx, res)
    },

    /**
    * @author dven 
    * @description 获取用户信息 
    */
    getUserInfo: async function(ctx, next) {
        let res = await userService.getUserInfo(ctx.headerInput);

        return response.map(ctx, res)
    }
}