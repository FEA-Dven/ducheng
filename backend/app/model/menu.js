const db = require('./../../library/db.js');
const TABLE = 't_food_menu';
const moment = require('moment');

module.exports = {
    /**
    * @author dven 
    * @description 批量插入菜单数据 
    * @param {Object} menuData 菜单数据
    */
    batchInsertMenu: async function(menuData) {
        let res = await db.writeMysql.batchInsert(TABLE, menuData, 30)
            .returning('id')

        return res;
    },

    /**
    * @author dven 
    * @description 获取菜单列表 
    * @param {Number} per_page 页码限制
    * @param {Number} offset 偏移量
    */
    getMenuList: async function(per_page, offset) {
        let res = await db.readMysql.select(
            'menu_id',
            'menu_name',
            'type',
            'price'
        )
        .limit(per_page)
        .offset(offset)
        .from(TABLE);

        return res;
    },

    /**
    * @author dven 
    * @description 获取菜单列表总数
    */
    getMenuListTotal: async function() {
        let res = await db.readMysql.count('menu_id as total')
            .first()
            .from(TABLE);

        return res;
    },

    /**
    * @author dven 
    * @description 获取菜单名字 
    * @param {Object} data 
    */
    getMenuNameListByMenuId: async function(data) {
        let res = await db.readMysql.select(
            'menu_id',
            'menu_name',
            'price'
        )
        .whereIn(
            'menu_id', data
        )
        .from(TABLE);

        return res;
    }
}
