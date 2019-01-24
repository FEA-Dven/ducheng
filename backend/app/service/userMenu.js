const userMenuModel = require('./../model/userMenu.js');
const foodDefines = require('./../../library/foodDefines.js');
const ApiError = require('./../../library/apiError');
const systemModel = require('./../model/system.js');
const userService = require('./../service/user.js');
const userModel = require('./../model/user.js');
const menuModel = require('./../model/menu.js');
const moment = require('moment');
const db = require('./../../library/db.js');

module.exports = {
    /**
    * @author dven 
    * @description 获取用户点餐列表 
    */
    getOrderInfoList: async function(ctx, next) {
        let fidList = [];
        let recordList = [];
        let list = await userMenuModel.getOrderInfoList();
        let [ userList, menuList ] = await Promise.all([
            this.getUserList(list),
            this.getMenuList(list)
        ]);
        // 获取用户唯一id数组
        list.forEach(item => {
            if (!fidList.includes(item.fid)) {
                fidList.push(item.fid);
            }
        });
        // 获取用户列表
        fidList.forEach(_fid => {
            let userMenuObj = {
                fid: _fid,
                menu_list: this.getUserMenuList(_fid, list, menuList)
            }
            let userInfo = userList.find(user => _fid === user.fid);
            userMenuObj.user_name = userInfo.user_name;
            recordList.push(userMenuObj);
        })
        // 算出价格
        recordList.forEach(item => {
            item.price = this.getPriceByMenuList(item.menu_list);
        });

        let returnMenuList = [];
        list.forEach(item => {
            let menuInfo = menuList.find(menu => item.menu_id === menu.menu_id);
            item.menu_name = menuInfo.menu_name;
            returnMenuList.push({
                menu_id: item.menu_id,
                menu_name: item.menu_name
            });
        });
        returnMenuList = this.filterMenuList(returnMenuList);
        return { 
            recordList: recordList,
            menuList: returnMenuList,
            order_num: list.length
        };
    },

    /**
    * @author dven 
    * @description 用户点餐 
    * @param {Array} orderList 用户选择菜单列表
    */
    userOrder: async function({ fid, orderList }) {
        let { order_end } = await systemModel.getSystemInfo();
        if ( !order_end ) {
            throw new ApiError('food.orderIsEnd');
        }
        let hasOrder = await this.userHasOrderMenu({ fid });
        if (hasOrder) {
            throw new ApiError('food.userOrderAlready');
        }
        let user_name = await userService.getUserName(fid);
        // 校验用户
        if (!foodDefines.realNameList().includes(user_name)) {
            throw new ApiError('food.illegalUser');
        }
        // 插入用户订单
        let userOrderList = [];
        let now = moment().unix();
        orderList.forEach(item => {
            item.fid = fid;
            item.create_time = now;    
            item.update_time = now;
            item.status = 1;
            let num =  item.num;
            delete item.num;
            for (let i = 0; i < num; i++) {
                userOrderList.push(item);
            } 
        })
        await userMenuModel.userOrder(userOrderList);
        
        return {};
    },

    /**
    * @author dven 
    * @description 用户是否已经订餐 
    * @param {Number} fid 用户id
    */
    userHasOrderMenu: async function({ fid }) {
        let info = await userMenuModel.findOne(fid);
        if (!info) return false;
        return true;
    },

    /**
    * @author dven 
    * @description 重置用户今日的点餐 
    */
    resetUserOrder: async function({ fid }) {
        let { order_end } = await systemModel.getSystemInfo();
        if ( !order_end ) {
            throw new ApiError('food.blackHouse');
        }
        let hasOrder = await this.userHasOrderMenu({ fid });
        if (!hasOrder) {
            throw new ApiError('food.userNotOrderToday');
        }
        await userMenuModel.resetUserOrder(fid);
        return {};
    },

    /**
    * @author dven 
    * @description 获取点餐的用户列表 
    * @param {Object} list 点餐列表
    */
    getUserList:async function(list){
        let userIds = [];
        list.forEach(item => {
            userIds.push(item.fid);
        })
        let userList = await userModel.findUserList(userIds);
        return userList;
    },

    /**
    * @author dven 
    * @description 获取菜单列表 
    * @param {Object} list 点餐列表
    */
    getMenuList: async function(list) {
        let menuIds = [];
        list.forEach(item => {
            menuIds.push(item.menu_id);
        })
        let menuList = await menuModel.getMenuNameListByMenuId(menuIds);
        return menuList;
    },

    /**
    * @author dven 
    * @description 主要为了去重菜单列表 
    */
    filterMenuList: function(menuList) {
        let menuListObj = {};
        let returnMenuList = []
        for (let i = 0; i < menuList.length; i++) {
            let menu = menuList[i];
            if (!menuListObj[menu.menu_name]) {
                menuListObj[menu.menu_name] = 1;
            } else {
                menuListObj[menu.menu_name]++;
            }
        }
        for (let key in menuListObj) {
            let obj = {
                menu_name: key,
                order_num: menuListObj[key]
            }
            returnMenuList.push(obj);
        }
        return returnMenuList;
    },

    /**
    * @author dven 
    * @description 获取用户点餐菜单列表 
    */
    getUserMenuList: function(fid, list, menuList) {
        let returnArr = [];
        let userMenuList = [];
        let cache = {};
        list.forEach(item => {
            if (item.fid === fid) {
                userMenuList.push(item);
            }
        })
        for (let i = 0; i < userMenuList.length; i++) {
            let userMenu = userMenuList[i];
            if (!cache[`MENU${userMenu.menu_id}`]) {
                cache[`MENU${userMenu.menu_id}`] = 1;
            } else {
                cache[`MENU${userMenu.menu_id}`] = cache[`MENU${userMenu.menu_id}`] + 1;
            }
        }
        for (let menuId in cache) {
            menuId = parseInt(menuId.replace('MENU', ''));
            let menuInfo = {
                menu_id: menuId,
                num: cache[`MENU${menuId}`]
            }
            let menuDetail = menuList.find(menu=> menuId === menu.menu_id);
            menuInfo.menu_name = menuDetail.menu_name;
            menuInfo.price = menuDetail.price;
            returnArr.push(menuInfo);
        }
        return returnArr;
    },

    /**
    * @author dven 
    * @description 根据用户菜单数组计算出价格 
    * @param {Array} menuList 菜单数组
    */
    getPriceByMenuList: function(menuList) {
        let price = 0;
        menuList.forEach(item => {
            price = price + ( item.price * item.num );
        })
        return price;
    }
}