import Cookies from 'js-cookie';


const COOKIE_KEY = {
    FID: 'fid',
    TOKEN: 'token',
    NICKNAME: 'nickname'
};

/**
 * @description 转化uninx时间戳
 * @param {unix格式的时间戳} unixTime 
 */
export const formatTime = (unixTime) => {
    return new Date(unixTime * 1000).toLocaleDateString();
};

/**
 * 获取前端路由地址
 */
export const getPagePath = (project, page) => {
    return `/${project}/${page}`;
};

/**
 * 页面开发调试用的console.log方法
 */
export const consoleLog = (res) => {
    /* eslint-disable no-console */
    console.log(res);
    /* eslint-enable no-console */
};


/**
 * 页面中请求api后，catch中调用的函数。目前只做console.error处理，因为报错的处理在axios层已经处理
 */
export const normalRequestErrorHandler = (res) => {
    /* eslint-disable no-console */
    console.error(res.msg);
    /* eslint-enable no-console */
};

/**
 * 页面中业务逻辑有可能会出现异常，这里统一处理，目前只做console.error处理。
 */
export const normalBusinessErrorHandler = (res) => {
    /* eslint-disable no-console */
    console.error(res.message);
    /* eslint-enable no-console */
};

/**
 * 登陆后把fid和token设进cookie
 */
export const setUserInfoCookie = ({ fid, token, nickname }) => {
    fid && Cookies.set(COOKIE_KEY.FID, fid);
    token && Cookies.set(COOKIE_KEY.TOKEN, token);
    nickname && Cookies.set(COOKIE_KEY.NICKNAME, nickname);
};

/**
 * 获取fid和token
 */
export const getUserInfoFromCookie = () => {
    let fid = Cookies.get(COOKIE_KEY.FID);
    let token = Cookies.get(COOKIE_KEY.TOKEN);
    let nickname = Cookies.get(COOKIE_KEY.NICKNAME);
    return { fid, token, nickname };
};

export const getHeaders = () => {
    let fid = Cookies.get(COOKIE_KEY.FID);
    let token = Cookies.get(COOKIE_KEY.TOKEN);
    return { fid, token };
};

/**
 * 退出登陆后把fid和token从cookie移除
 */
export const clearUserInfoCookie = () => {
    Cookies.remove(COOKIE_KEY.FID);
    Cookies.remove(COOKIE_KEY.TOKEN);
};

/**
 * 通过菜单列表对象，查找当前被选中页面的page属性
 */
export const findActivePageByMenu = (menuList) => {
    let activePage;
    menuList.find(menu => {
        if (menu.state) {
            activePage = menu.page;
        } else if (menu.sub) {
            menu.sub.forEach(res => {
                if (res.state) {
                    activePage = res.page;
                }
            });
        }
    });
    return activePage || menuList[0].page;
};

/**
 * 通过菜单列表对象，查找当前被选中页面返回所有菜单信息
 */
export const findActiveMenuInfoByMenu = (menuList) => {
    let activePage;
    menuList.find(menu => {
        if (menu.state) {
            activePage = menu;
        } else if (menu.sub) {
            menu.sub.forEach(res => {
                if (res.state) {
                    activePage = res;
                }
            });
        }
    });
    return activePage || menuList[0].page;
};

/**
 * 通过菜单列表对象，查找当前被选中页面返回菜单Id
 */
export const findActiveMenfidByMenu = (menuList) => {
    let menfid;
    menuList.find(menu => {
        if (menu.state) {
            menfid = menu.id;
        } else if (menu.sub) {
            menu.sub.forEach(res => {
                if (res.state) {
                    menfid = res.id;
                }
            });
        }
    });
    return menfid || menuList[0].id;
};


// 深复制对象
export const deepCopy = (data) => {
    const t = Object.prototype.toString.call(data).replace(/\[object |\]/g, '').toLowerCase();
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
};
/**
* @author dven 
* @description 格式化时间(将时间戳转换为) YY/MM/DD HH:MM:SS的格式
* @param {timeStamp} time 时间戳
*/
export const formatUpdateTime = (time) => {
    let date = new Date(time);
    const formatNumber = n => {
        n = n.toString();
        return n[1] ? n : '0' + n;
    };
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

/**
* 解析字符串对象
*/
export const jsonParse = (str) => {
    try {
        return JSON.parse(str);
    } catch (err) {
        normalRequestErrorHandler(err);
        return str;
    }
};

/**
* @author dven 
* @description 深度拷贝 
* @param {Object} obj 需要深度拷贝的对象
*/
export const deepClone = (obj) => {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                // 判断obj子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    // 如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
};

/**
* @author set
* @description 遍历对象返回 get请求url的参数拼接
* @param {data}  Object 参数对象
*/
export const getDataUrl = (data) => {
    let url = '';
    for (let item in data) {
        if (typeof data[item] === 'boolean' || !isEmpty(data[item]) && data[item] != '') {
            if (url == '') {
                url += `?${item}=${data[item]}`;
            } else {
                url += `&${item}=${data[item]}`;
            }
        }
    }
    return url;
};

/**
* @author dven 
* @description 判断类型 
* @param {Object/String/Number} 需要判断类型的对象
* @param {String} type
* @returns {Boolean} true为符合所指定的类型,false则不符合
*/
export const matchByType = (param, type) => {
    let result = Number.isNaN(param) ? 'NaN' : Object.prototype.toString.call(param).replace(/\[object |\]/g, '');
    return result === type;
};

// 打印出log信息
export const log = (...res) => {
    /* eslint-disable no-console */
    console.log(...res);
    /* eslint-enable no-console */
};

// 表格百分比排序
export const sortMethod = (a, b, type) => {
    let at = Number(parseFloat(a));
    let bt = Number(parseFloat(b));
    if (type === 'asc') {
        return at > bt ? 1 : -1;
    } else {
        return at > bt ? -1 : 1;
    }
};
/**
 * @author 昌盛
 * @description 判断值是否为空
 */
export const isEmpty = val => val === undefined || val === null || (typeof val === 'number' && isNaN(val));


/**
* @author dven 
* @description 函数节流 
* @param {Function} method 要执行的函数
* @param {Object} context 作用域
* @param {Number} time 节流时间
*/
export const throttle = (method, context, time) => {
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    }, time);
};

/**
* @author dven 
* @description 获取域名 
*/
export const getDomainName = () => {
    return `//${window.location.host}`;
};

/**
* @author dven 
* @description 更具数组id去重 
* @param {Array} uniqArr 需要去重的数组
*/
export const listUniq = (uniqArr) => {
    let returnList = [];
    for (let i = 0; i < uniqArr.length; i++) {
        let canPush = true;
        for (let k = 0; k < returnList.length; k++){
            if (returnList[k].id == uniqArr[i].id){
                canPush = false;
                break;
            }
        }
        if (canPush){
            returnList.push(uniqArr[i]);
        }
    }
    return returnList;
};

/**
* @author dven 
* @description 前端自己做分页 
* @param {Number} per_page 页面显示的最大数
* @param {Number} page_number 页面显示的最大数
* @param {Number} total 总数
* @returns {Boolean} hasMore 是否还有下一页
*/
export const getPageHasMore = ({per_page, page_number, total}) => {
    let hasMore = true;
    if (per_page * page_number >= total){
        hasMore = false;
    }
    return hasMore;
};

/**
* @author dven 
* @description 前端自己做分页 
* @param {Number} per_page 页面显示的最大数
* @param {Number} page_number 页面显示的最大数
* @param {Number} total 总数
*/
export const shouldRedirectToLogin = () => {
    const { fid } = getUserInfoFromCookie();
    const login = !!fid;
    // 未登陆重定向到登陆页面
    return !login;
}
