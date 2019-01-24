const db = require('./../../library/db.js');
const moment = require('moment');
const TABEL = 't_food_system';


module.exports = {
    /**
    * @author dven 
    * @description 获取订单系统的开关 
    */
    getSystemInfo: async function() {
        let res = await db.readMysql(TABEL).select(
            'order_end'
        ).first();
        return res;
    },

    /**
    * @author dven 
    * @description 改变订单系统截止开关 
    * @param {Number} is_open 开关操作
    */
    changeSystemOpen: async function(is_open) {
        let res = await db.writeMysql(TABEL)
        .where({ id: 1 })
        .update({
            'order_end': is_open,
            'update_time': moment().unix()
        });
        return res;
    },
};
