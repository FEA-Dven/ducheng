const systemModel = require('./../model/system.js');
const userModel = require('./../model/user.js');

module.exports = {
    /**
    * @author dven 
    * @description 改变系统截止开关 
    * @param {Number} is_open 开关值 0:关1:开
    */
    changeSystemOpen: async function ({ fid, is_open }) {
        let userInfo = await userModel.findOne('role', {
            'fid': fid
        });
        if (userInfo.role !== 1) {
            throw new ApiError('food.blackHouse');
        }
        await systemModel.changeSystemOpen(is_open);
        return {}
    },

    /**
    * @author dven 
    * @description 获取系统配置 
    */
    getSystemInfo: async function() {
        let res = await systemModel.getSystemInfo();
        return res;
    }
    
}