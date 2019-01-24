module.exports = {
    "plat_read_mysql": {
        host: '',
        user: '',
        password: '',
        database: '',
        minConnection: 3,
        maxConnection: 10,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timezone: 'PRC',
        debug:true
    },

    /**
     * 平台数据库写库配置
     */
    "plat_write_mysql": {
        host: '',
        user: '',
        password: '',
        database: '',
        minConnection: 3,
        maxConnection: 10,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timezone: 'PRC',
        debug:true
    },

    /**
     * redis配置
     */
    "redis": {
        host: '127.0.0.1',
        port: 6379
    }
   
};