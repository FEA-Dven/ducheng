import store from '@store';
import { env } from '@config';
/**
 * 该工具提供给第三方开发者开发页面时获取全局变量用
 */

/**
 * @description 获取项目名称
 */
export const getCurrentProjectPathName = () => {
    return store.getters.getCurrentProjectPathName;
};

/**
 * 获取cid
 */
export const getCurrentColumnId = () => {
    return store.getters.currentColumnId;
};

/**
 * 获取前端路由地址
 */
export const getCurrentMenuId = () => {
    return store.getters.currentMenuId;
};

/**
 * 获取用户id
 */
export const getUserId = () => {
    return store.getters.userId;
};

/**
 * 获取token
 */
export const getUserToken = () => {
    return store.getters.userToken;
};

/**
 * 获取当前项目的appid
 */
export const getAppId = () => {
    return store.getters.currentAppId;
};

/**
 * 获取当前编译环境 dev test prod
 */
export const getEnv = () => {
    return env;
};
