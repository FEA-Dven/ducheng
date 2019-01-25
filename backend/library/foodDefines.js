const config = require('./../config/config.js');
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
        return config.whiteNameList;

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
            },
            {
                price: 11,
                menu_name: '莲子百合炖瘦肉',
                type: 3
            },
            {
                price: 11,
                menu_name: '香菇栗子炖排骨',
                type: 3
            },
            {
                price: 11,
                menu_name: '青榄炖瘦肉',
                type: 3
            },
            {
                price: 12,
                menu_name: '西洋菜炖陈肾',
                type: 3
            },
            {
                price: 14,
                menu_name: '花旗参炖竹丝鸡',
                type: 3
            },
            {
                price: 18,
                menu_name: '虫草菌干鲍鱼炖瘦肉',
                type: 3
            },
            {
                price: 20,
                menu_name: '花胶红枣炖竹丝鸡',
                type: 3
            },
            {
                price: 8,
                menu_name: '都城玉米汁(开发推荐)',
                type: 4
            },
            {
                price: 8,
                menu_name: '鲜奶红豆冰',
                type: 4
            },
            {
                price: 8,
                menu_name: '冻鸳鸯',
                type: 4
            },
            {
                price: 8,
                menu_name: '热鸳鸯',
                type: 4
            },
            {
                price: 8,
                menu_name: '冻奶茶',
                type: 4
            },
            {
                price: 8,
                menu_name: '热奶茶',
                type: 4
            },
            {
                price: 8,
                menu_name: '冻咖啡',
                type: 4
            },
            {
                price: 8,
                menu_name: '热咖啡',
                type: 4
            },
            {
                price: 8,
                menu_name: '鲜柠蜜',
                type: 4
            },
            {
                price: 8,
                menu_name: '鲜柠茶',
                type: 4
            },
            {
                price: 8,
                menu_name: '冻豆浆',
                type: 4
            },
            {
                price: 8,
                menu_name: '热豆浆',
                type: 4
            },
            {
                price: 14,
                menu_name: '炸酱面',
                type: 5
            },
            {
                price: 17,
                menu_name: '鲜虾蟹子云吞面',
                type: 5
            },
            {
                price: 17,
                menu_name: '鲜虾蟹子云吞粉',
                type: 5
            },
            {
                price: 17,
                menu_name: '净鲜虾蟹子云吞',
                type: 5
            },
            {
                price: 17,
                menu_name: '和味排骨面',
                type: 5
            },
            {
                price: 17,
                menu_name: '和味排骨粉',
                type: 5
            },
            {
                price: 19,
                menu_name: '明炉烧鸭面',
                type: 5
            },
            {
                price: 19,
                menu_name: '明炉烧鸭粉',
                type: 5
            },
            {
                price: 20,
                menu_name: '黑椒烧排骨面',
                type: 5
            },
            {
                price: 20,
                menu_name: '黑椒烧排骨粉',
                type: 5
            },
            {
                price: 20,
                menu_name: '秘制牛腩面',
                type: 5
            },
            {
                price: 20,
                menu_name: '秘制牛腩粉',
                type: 5
            },
            {
                price: 20,
                menu_name: '麻辣牛jian面',
                type: 5
            },
            {
                price: 20,
                menu_name: '麻辣牛jian粉',
                type: 5
            },
            {
                price: 23,
                menu_name: '鲍汁花胶捞面',
                type: 5
            }
        ];
        return foodData;
    }
}