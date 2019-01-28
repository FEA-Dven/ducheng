const db = require('./../../library/db.js');
const TABLE = 't_food_user';
const moment = require('moment');

module.exports = {
    /**
    * @author dven 
    * @description 用户登录  
    * @param {String} user_name 用户名
    * @param {String} account 账号
    * @param {String} password 用户密码
    */
    addUser: async function(user_name, account, password) {
        let time = moment().unix();
        let res = await db.writeMysql(TABLE)
        .returning('fid')
        .insert({
            'user_name': user_name,
            'account': account,
            'password': password,
            'create_time': time,
            'update_time': time,
            "status": 1
        });
        return res;
    },

    /**
    * @author dven 
    * @description  用户登录返回用户信息
    */
    login: async function(account, password) {
        let res = await db.readMysql.select(
            'fid',
            'user_name'
        ).where({
            'password': password,
            'account': account,
            'status': 1
        })
        .from(TABLE)
        .first();
        
        return res;
    },

    /**
    * @author dven 
    * @description 根据用户名查找用户id
    * @param {String} user_name 用户名 
    */
    findOne: async function (selectOption, whereOptions) {
        let res = await db.readMysql.select(
            selectOption
        ).where(whereOptions)
        .from(TABLE)
        .first();

        return res;
    },

    /**
    * @author dven 
    * @description 根据fid找用户名
    * @param {String} fid 用户名 
    */
    findOneByFid: async function (fid) {
        let res = await db.readMysql.select(
            'user_name'
        ).where({
            'fid': fid,
            'status': 1
        })
        .from(TABLE)
        .first();

        return res;
    },

    /**
    * @author dven 
    * @description 根据fid找用户名群
    * @param {String} data 用户名 
    */
    findUserList: async function (data) {
        let res = await db.readMysql.select(
            'user_name',
            'fid'
        ).whereIn('fid', data)
        .from(TABLE)

        return res;
    },

    /**
    * @author dven 
    * @description 重置用户密码 
    * @param {String} newPassword 新密码
    * @param {String} account 账户名
    */
    resetUserPassword: async function(account, newPassword) {
        let res = await db.writeMysql.update({
            'password': newPassword
        })
        .where({'account': account})
        .from(TABLE)

        return res;
    },

    /**
    * @author dven 
    * @description 获取用户信息 
    * @param {Number} fid 用户密码
    */
    getUserInfo: async function(fid) {
        let res = await db.writeMysql.select(
            'account',
            'user_name',
            'role'
        )
        .where({'fid': fid})
        .from(TABLE)
        .first()

        return res;
    }
}
