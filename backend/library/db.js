const dbConfig = require('./../config/db.js');
const Knex = require('knex');
const Ioredis = require('ioredis');
const logger = require('./../util/logger.js');
class DB {
    constructor() {
        try {
            this.redis = new Ioredis(dbConfig.redis);

            /**
             * redis监控日志
             */
            this.redis.on('connect', function () {
                logger.getLogger('default').trace('redis', '连接成功');
                console.log('redis connect success');
            });

            this.redis.on('error', function () {
                logger.getLogger('error').fatal('redis', '连接失败');
                console.log('redis connect error');
            });

            this.redis.on('reconnecting', function () {
                logger.getLogger('error').warn('redis', '尝试重新连接中');
                console.log('redis connect reconnecting');
            });
            
            this.readMysql = new Knex({
                client: 'mysql',
                debug: dbConfig.plat_read_mysql.debug,
                connection: {
                    host: dbConfig.plat_read_mysql.host,
                    user: dbConfig.plat_read_mysql.user,
                    password: dbConfig.plat_read_mysql.password,
                    database: dbConfig.plat_read_mysql.database,
                    timezone: dbConfig.plat_read_mysql.timezone,
                },
                pool: {
                    min: dbConfig.plat_read_mysql.minConnection,
                    max: dbConfig.plat_read_mysql.maxConnection
                },
            });

            this.writeMysql = new Knex({
                client: 'mysql',
                debug: dbConfig.plat_write_mysql.debug,
                connection: {
                    host: dbConfig.plat_write_mysql.host,
                    user: dbConfig.plat_write_mysql.user,
                    password: dbConfig.plat_write_mysql.password,
                    database: dbConfig.plat_write_mysql.database,
                    timezone: dbConfig.plat_write_mysql.timezone,
                },
                pool: {
                    min: dbConfig.plat_write_mysql.minConnection,
                    max: dbConfig.plat_write_mysql.maxConnection
                },
            });

        } catch (e) {
            // db创建出现异常，需要进行告警
            logger.getLogger('error').error("创建数据库链接错误", e.message);
            console.log("创建数据库链接错误:", e);
        }
    }
}
module.exports = new DB();