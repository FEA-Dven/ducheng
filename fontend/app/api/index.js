import request from '@libs/api_request';
import { getUserInfoFromCookie, getDataUrl } from '@libs/util';


/**
* @author dven
* @description 获取食物列表
*/
export const getFoodList = async ({ per_page, page_number }) => {
    return await request({
        url: `/api/menus${getDataUrl({ per_page, page_number })}`,
        method: 'GET'
    })
}

/**
* @author dven
* @description 用户登录
* @param {String} account 用户真实名称
* @param {String} password 密码
*/
export const login = async ({ account, password }) => {
    return await request({
        url: '/api/user/login',
        method: 'POST',
        data:{
            account,
            password
        }
    })
}

/**
* @author dven
* @description 用户注册
* @param {String} user_name 用户真实名称
* @param {String} account 用户账号
* @param {String} password 密码
*/
export const register = async ({ user_name, account, password }) => {
    return await request({
        url: '/api/user/sign',
        method: 'POST',
        data: {
            user_name, account, password
        }
    })
}

/**
* @author dven 
* @description 改变订单开关 
* @param {Number} is_open 订单开关
*/
export const changeSystemOpen = async ({ is_open }) => {
    return await request({
        url: '/api/system/is_open',
        method: 'POST',
        data:{
            is_open: is_open
        }
    })
}

/**
* @author dven 
* @description 获取开关状态
*/
export const getSystemInfo = async () => {
    return await request({
        url: '/api/system/is_open',
        method: 'GET'
    })
}

/**
* @author dven
* @description 确认选择食物
* @param {Number} orderList 下单列表
*/
export const userOrder = async ({ orderList }) => {
    return await request({
        url: '/api/user/order',
        method: 'POST',
        data:{
            fid: getUserInfoFromCookie().fid,
            orderList
        }
    })
}

/**
* @author dven
* @description 确认选择食物
*/
export const getUserOrderStatus = async () => {
    return await request({
        url: '/api/user/order',
        method: 'GET'
    })
}

/**
* @author dven
* @description 获取菜单详情列表
*/
export const getMenuList = async ({}) => {
    return await request({
        url: '/api/menu/orders',
        method: 'GET'
    })
}

/**
* @author dven
* @description 获取用户订单列表
*/
export const getUserOrderList = async () => {
    return await request({
        url: '/api/menu/user_orders',
        method: 'GET'
    })
}

/**
* @author dven
* @description 获取用户订单列表
*/
export const resetUserOrder = async () => {
    return await request({
        url: '/api/user/order',
        method: 'PUT',
        data:{
            fid: getUserInfoFromCookie().fid
        }
    })
}

/**
* @author dven 
* @description 获取点餐列表
*/
export const getOrderFoodList = async () => {
    return await request({
        url: '/api/menu/orders',
        method: 'GET'
    })
}

/**
* @author dven 
* @description 更改用户密码 
* @param {String} account 账户名
* @param {String} password 密码
*/
export const resetUserPassword = async ({ account, password }) => {
    return await request({
        url: '/api/user/reset_password',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

/**
* @author dven 
* @description 获取用户信息 
*/
export const getUserInfo = async () => {
    return await request({
        url: '/api/user/info',
        method: 'GET'
    })
}

/**
* @author dven 
* @description 回复用户的评论 
* @param {Number} comment_fid 评论的发起人Id
* @param {String} content 回复内容
*/
export const replyUserComment = async ({ comment_id, comment_fid, content }) => {
    return await request({
        url: `/api/user/${comment_fid}/comment/${comment_id}/reply`,
        method: 'POST',
        data: {
            content
        }
    })
}

/**
* @author dven 
* @description 发表评论 
* @param {String} content 回复内容
*/
export const sendComment = async ({ content }) => {
    return await request({
        url: '/api/user/send/comment',
        method: 'POST',
        data: {
            content
        }
    })
}

/**
* @author dven 
* @description 用户点赞
* @param {Number} comment_fid 评论用户id 
* @param {Number} comment_id 评论id 
*/
export const userStar = async ({ comment_fid, comment_id }) => {
    return await request({
        url: `/api/user/${comment_fid}/comment/${comment_id}/star`,
        method: 'post',
        data: {}
    })
}

/**
* @author dven 
* @description 发表评论 
* @param {String} content 回复内容
* @param {Number} per_page 页码限制数
* @param {Number} page_number 页码数
*/
export const getCommentList = async ({ per_page, page_number }) => {
    return await request({
        url: `/api/comment/list${getDataUrl({ per_page, page_number })}`,
        method: 'GET'
    })
}

/**
* @author dven 
* @description 删除评论 
* @param {Number} comment_id 评论id
*/
export const deleteComment = async ({ comment_id }) => {
    return await request({
        url: `/api/comment/${comment_id}/delete`,
        method: 'DELETE'
    })
}

