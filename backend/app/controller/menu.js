const menuValidation = require('./../validation/menu.js');
const response = require('../../util/response.js');
const validator = require('../../util/requestValidator.js');
const menuService = require('./../service/menu.js');

module.exports = {
    /**
    * @author dven 
    * @description 批量插入菜单数据 
    */
    batchInsertMenu: async function(ctx, next) {
        let res = await menuService.batchInsertMenu();
        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 获取菜单列表 
    */
    getMenuList: async function(ctx, next) {
        ctx.input = {
            ...ctx.input,
            ...ctx.headerInput
        };
        await validator.validate(
            ctx.input,
            menuValidation.menuList.schema,
            menuValidation.menuList.options
        )
        let res = await menuService.getMenuList(ctx.input);
        return response.map(ctx, res);
    }
}