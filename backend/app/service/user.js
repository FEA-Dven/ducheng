const userModel = require('./../model/user.js');
const redis = require('./../../library/db.js').redis;
const UTIL = require('./../../util/utils.js');
const foodDefines = require('./../../library/foodDefines.js');
const ApiError = require('./../../library/apiError');
const encrypto = require('./../../library/encrypt.js');

module.exports = {
    /**
    * @author dven 
    * @description  用户登录业务逻辑
    * @param {String} account 账户名
    * @param {Number} password 密码
    */
    login: async function ({ account, password }) {
        password = encrypto.md5Crypto(password);
        userInfo = await userModel.login(account, password);
        UTIL.findOrFail(userInfo, '账号名或密码不正确，请前往注册');
        await this.setTokenInCacheUserInfo(userInfo);
        return userInfo;
    },

    /**
    * @author dven 
    * @description  用户注册
    * @param {String} user_name 用户名
    * @param {String} account 用户输入的真实名称
    * @param {Number} password 密码
    */
    sign: async function ({ user_name, account, password }) {
        this.checkRealName(user_name);
        let [ userNameInfo, accountInfo ] = await Promise.all([
            userModel.findOne('fid', {
                status: 1,
                user_name: user_name
            }),
            userModel.findOne('fid', {
                status: 1,
                account: account
            }),
        ]);
        if (!userNameInfo && !accountInfo) {
            password = encrypto.md5Crypto(password); 
            let res = await userModel.addUser(user_name, account, password);
            let fid = res[0];
            let userInfo = {
                fid,
                user_name
            };
            await this.setTokenInCacheUserInfo(userInfo);
            return userInfo;
        }
        throw new ApiError('food.userHasExist');
    },

    /**
    * @author dven 
    * @description 校验真实名称
    * @param {String} user_name 用户真实姓名
    */
    checkRealName: function (user_name) {
        let realNameList = foodDefines.realNameList();
        if ( !realNameList.includes(user_name) ) {
            throw new ApiError('food.userNameInvalid');
        }
    },

    /**
    * @author dven 
    * @description 更具fid获取nickname 
    * @param {Number} fid 用户id
    */
    getUserName: async function(fid){
        let { user_name } = await userModel.findOneByFid(fid);
        return user_name;
    },

    /**
    * @author dven 
    * @description 用户重置密码 
    * @param {String} account 用户账号
    * @param {String} password 用户密码
    */
    resetPassword: async function ({ account, password }) {
        let userInfo = await userModel.findOne('fid', {
            status: 1,
            account: account
        })
        UTIL.findOrFail(userInfo, '账号名或密码不正确，请前往注册');
        let newPassword = encrypto.md5Crypto(password);
        await userModel.resetUserPassword(account, newPassword);
        return {};
    },

    /**
    * @author dven 
    * @description 获取用户信息 
    * @param {Number} fid 用户id
    */
    getUserInfo: async function({ fid }) {
        let userInfo = await userModel.getUserInfo(fid);
        return userInfo;
    },

    /**
    * @author dven 
    * @description 将token放入userInfo 
    * @param {Object} userInfo 用户信息
    */
    setTokenInCacheUserInfo: async function(userInfo) {
        let token = UTIL.genUUID();
        userInfo.token = token;
        await redis.setex(foodDefines.userInfoCacheKey(userInfo.fid),  foodDefines.TTL_TENTH_DAY, JSON.stringify(userInfo));
    }
}