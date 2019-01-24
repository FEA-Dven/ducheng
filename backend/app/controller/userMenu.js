const userMenuValidation = require('./../validation/userMenu.js');
const response = require('../../util/response.js');
const validator = require('../../util/requestValidator.js');
const userMenuService = require('./../service/userMenu.js');


module.exports = {
    /**
    * @author dven 
    * @description 获取用户点餐列表 
    */
    getOrderInfoList: async function(ctx, next) {
        let res = await userMenuService.getOrderInfoList(ctx.input);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 用户点餐 
    */
    userOrder: async function(ctx, next) {
        await validator.validate(
            ctx.input,
            userMenuValidation.userOrder.schema,
            userMenuValidation.userOrder.options
        )
        ctx.input.fid = ctx.headerInput.fid;
        let res = await userMenuService.userOrder(ctx.input);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 取消用户订餐 
    */
    resetUserOrder: async function(ctx, next) {
        let res = await userMenuService.resetUserOrder(ctx.headerInput);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 获取用户是否已经订餐 
    */
    getUserOrderStatus: async function(ctx, next) {
        let res = await userMenuService.userHasOrderMenu(ctx.headerInput);
        return response.map(ctx, {
            has_order: res
        });
    }
}