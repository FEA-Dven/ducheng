const systemValidation = require('./../validation/system.js');
const response = require('../../util/response.js');
const validator = require('../../util/requestValidator.js');
const systemService= require('./../service/system.js');

module.exports = {
    /**
    * @author dven 
    * @description 改变截止开关
    */
    changeSystemOpen: async function(ctx, next) {
        await validator.validate(
            ctx.input,
            systemValidation.changeSystemOpen.schema,
            systemValidation.changeSystemOpen.options
        )
        ctx.input.fid = ctx.headerInput.fid;
        let res = await systemService.changeSystemOpen(ctx.input);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 获取开关 
    */
    getSystemInfo: async function(ctx, next) {
        let res = await systemService.getSystemInfo();
        return response.map(ctx, res);
    }
}