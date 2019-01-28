const db = require('./../../library/db.js');
const TABLE = 't_food_user_menu_refs';
const moment = require('moment');
const dateUtil = require('./../../util/dateUtil.js');

module.exports = {
    /**
    * @author dven 
    * @description 用户选择菜单 
    * @param {Array} userOrderList 用户订单菜单
    */
    userOrder: async function(userOrderList) {
        let res = await db.writeMysql.batchInsert(TABLE, userOrderList, 30)
        .returning('id')

        return res;
    },

    /**
    * @author dven 
    * @description 用户选择菜单 
    * @param {Number} fid 用户id
    */
    findOne: async function(fid) {
        let { todayStartTime, todayEndTime } = dateUtil.getStartAndEndByDay();
        let res = await db.readMysql.select(
            'id'
        )
        .where(
            'create_time', '>', todayStartTime,
        )
        .andWhere(
            'create_time', '<', todayEndTime,
        )
        .andWhere({
            'status': 1,
            'fid': fid
        })
        .from(TABLE)
        .first()

        return res;
    },

    /**
    * @author dven 
    * @description 重置用户点餐
    * @param {Number} fid 用户id
    */
    resetUserOrder: async function(fid) {
        let { todayStartTime, todayEndTime } = dateUtil.getStartAndEndByDay();
        let res = await db.writeMysql.update({
            'status': 0
        })
        .where(
            'create_time', '>', todayStartTime,
        )
        .andWhere(
            'create_time', '<', todayEndTime,
        )
        .andWhere({
            'fid': fid
        })
        .from(TABLE)

        return res;
    },

    /**
    * @author dven 
    * @description 获取点餐列表 
    */
    getOrderInfoList: async function(){
        let { todayStartTime, todayEndTime } = dateUtil.getStartAndEndByDay();
        let res = await db.readMysql.select(
            'fid',
            'menu_id'
        )
        .where(
            'create_time', '>', todayStartTime,
        )
        .andWhere(
            'create_time', '<', todayEndTime,
        )
        .andWhere({
            'status': 1
        })
        .from(TABLE)
        .orderBy('create_time', 'desc')

        return res;
    }
}
