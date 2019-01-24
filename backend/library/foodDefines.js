/**
 * 定义一些key或者常量
 * 例如:redis存储key, 常用的不随环境变化的配置
 */

module.exports = {
    /**
     * 一天过期时间秒数
     */
    ttl_one_day: 86400,
    // 三十天的时间数
    TTL_TENTH_DAY: 864000, 

    /**
    * 构造redis存储key
    * @author dven
    * @description 构造 : 分隔的key
    * @param 字符串作为参数传入，多选参数
    * @returns 返回key
    */
    redisCacheKey: function(...params) {
        let result = '';
        params.forEach(element => {
            result += ((result.length > 0) ? ':' : '') + element
        })
        return result;
    },

    /**
    * @author dven 
    * @description 用户redis key 
    * @param {Number} fid 用户id
    */
    userInfoCacheKey: function(fid) {
        return this.redisCacheKey('FOOD', 'PROGRAM', 'USER', 'INFO', 'FID', fid);
    },

    /**
    * @author dven 
    * @description 用户redis key 
    * @param {Number} user_id 用户id
    * @param {String} user_name 用户昵称
    */
    userLoginCacheKey: function(user_name, password) {
        return this.redisCacheKey('FOOD', 'PROGRAM', 'USER', 'LOGIN', user_name, password);
    },

    /**
    * @author dven 
    * @description 用户redis key 
    * @param {String} account 用户昵称
    */
    userSignCacheKey: function(account) {
        return this.redisCacheKey('FOOD', 'PROGRAM', 'USER', 'SIGN', account);
    },

    /**
    * @author dven 
    * @description 获取菜单的key 
    */
    foodMenuCacheKey: function(per_page, page_number) {
        return this.redisCacheKey('FOOD', 'PROGRAM', 'MENU', per_page, page_number);
    },

    /**
    * @author dven 
    * @description 获取用户名 
    */
    realNameList: function() {
        return [
            '邓耀文'
        ]
    },

    foodMenuList: function() {
        const foodData = [
            {
                price: 6,
                menu_name: '例汤',
                type: 0
            },
            {
                price: 16,
                menu_name: '豉汁凉瓜炒鸡柳饭',
                type: 0
            },
            {
                price: 17,
                menu_name: '虾仁韭菜炒蛋饭',
                type: 0
            },
            {
                price: 17,
                menu_name: '梅酱子姜焖鸭饭',
                type: 0
            },
            {
                price: 17,
                menu_name: '红烧豆腐肉丝饭',
                type: 0
            },
            {
                price: 18,
                menu_name: '香辣汁薯仔蒸排骨饭',
                type: 0
            },
            {
                price: 19,
                menu_name: '和味支柱牛腩饭',
                type: 0
            },
            {
                price: 15,
                menu_name: '番茄肉丝炒蛋饭',
                type: 1
            },
            {
                price: 17,
                menu_name: '西芹云耳炒肉片饭',
                type: 1
            },
            {
                price: 17,
                menu_name: '吉列猪扒番茄饭',
                type: 1
            },
            {
                price: 17,
                menu_name: '香煎莲藕肉饼蛋脯饭',
                type: 1
            },
            {
                price: 17,
                menu_name: '辣子鸡饭',
                type: 1
            },
            {
                price: 17,
                menu_name: '冬菇云耳蒸鸡腿肉饭',
                type: 1
            },
            {
                price: 20,
                menu_name: '古法纸包鸡饭',
                type: 1
            },
            {
                price: 21,
                menu_name: '黑椒鸡扒番茄饭',
                type: 1
            },
            {
                price: 21,
                menu_name: '奥尔良鸡翅饭番茄饭',
                type: 1
            },
            {
                price: 21,
                menu_name: '香辣鸡翅番茄饭',
                type: 1
            },
            {
                price: 23,
                menu_name: '麻辣牛展饭',
                type: 1
            },
            {
                price: 24,
                menu_name: '金牌蒜香骨饭',
                type: 1
            },
            {
                price: 18,
                menu_name: '盐焗手撕鸡',
                type: 2
            },
            {
                price: 18,
                menu_name: '麻辣手撕鸡',
                type: 2
            },
            {
                price: 19,
                menu_name: '客家咸香鸡',
                type: 2
            },
            {
                price: 19,
                menu_name: '蜜汁叉烧饭',
                type: 2
            },
            {
                price: 19,
                menu_name: '明炉烧鸭饭',
                type: 2
            },
            {
                price: 20,
                menu_name: '黑椒烧排骨饭',
                type: 2
            },
            {
                price: 21,
                menu_name: '蜜汁叉烧咸蛋饭',
                type: 2
            },
            {
                price: 23,
                menu_name: '烧味双拼饭',
                type: 2
            },
            {
                price: 24,
                menu_name: '全腿饭',
                type: 2
            },
            {
                price: 14,
                menu_name: '黑椒烧排骨(碟)',
                type: 2
            },
            {
                price: 14,
                menu_name: '客家咸香鸡(碟)',
                type: 2
            },
            {
                price: 14,
                menu_name: '明炉烧鸭(碟)',
                type: 2
            }
        ];
        return foodData;
    }
}