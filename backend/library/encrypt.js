const crypto = require('crypto');
const MD5_SALT = 'abcdefg';
module.exports = {

    /**
     * md5 加密 加盐
     * @returns {number}
     */
    md5Crypto: function(password){
        let saltPassword = password + ':' + MD5_SALT;//随便一个固定的字符串
        return crypto.createHash('md5').update(saltPassword).digest('hex');
    },

    /**
     * md5 加密
     * @returns {number}
     */
    md5: function(variable){
        return crypto.createHash('md5').update(variable).digest('hex');
    },

}