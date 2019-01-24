const apiErrorDefines = require('./apiErrorDefines.js');
class ApiError extends Error {
    /**
     * 构造方法
     * @param errorName 错误名称
     * @param params 错误信息参数
     */
    constructor(errorName, ...params) {
        super();
        let errorInfo = apiErrorDefines(errorName, params);
        this.name = errorName;
        this.code = errorInfo.code;
        this.status = errorInfo.status;
        this.message = errorInfo.message;
    }
}
module.exports = ApiError;