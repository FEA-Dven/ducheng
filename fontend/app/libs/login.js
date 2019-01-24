import { clearUserInfoCookie } from '@libs/util.js';

/**
* @author dven 
* @description 用户权限校验 
* @param {Object} error 错误对象
*/
export const userTokenInValid = (error) => {
    // 用户权限失败
    if (error && error.status === 403) {
        clearUserInfoCookie();
        window.location.href = 'tiger/login';
        return true;
    }
    return false;
};

