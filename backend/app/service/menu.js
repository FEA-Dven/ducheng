const menuModel = require('./../model/menu.js');
const UTIL = require('./../../util/utils.js');
const foodDefines = require('./../../library/foodDefines.js');
const ApiError = require('./../../library/apiError');
const moment = require('moment');

module.exports = {
    /**
    * @author dven 
    * @description 批量插入菜单 
    */
    batchInsertMenu: async function () {
        let foodMenuList = foodDefines.foodMenuList();
        let now = moment().unix();
        foodMenuList.forEach(item => {
            item.create_time = now;    
            item.update_time = now;
            item.status = 1;
        })
        let res = await menuModel.batchInsertMenu(foodMenuList);
        if ( !UTIL.matchByType(res[0], 'Number') ) {
            throw new ApiError('food.insertMenuError');
        }
        return res;
    },

    /**
    * @author dven 
    * @description 获取菜单列表 （分页一般不做缓存）
    */
    getMenuList: async function({ per_page, page_number }){
        per_page = parseInt(per_page);
        page_number = parseInt(page_number);
        let offset = per_page * (page_number - 1);
        menuList = await menuModel.getMenuList(per_page, offset);
        let { total } = await menuModel.getMenuListTotal();
        let has_more = UTIL.getPageHasMore({ per_page, page_number, total });
        let list = menuList;
        return  { list, has_more, total};
    }
}