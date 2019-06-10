const logger = require('../util/logger.js');
const ApiError = require('../library/apiError.js');
const response = require('../util/response.js');

module.exports = async function (ctx, next) {
    let beginTime = new Date().getTime();
    try {
        await next();
        let req = ctx.request;
        let res = ctx.response;
        let input = ctx.input;
        let endTime = new Date().getTime();
        let ip = req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;

        let fields = {
            status: res.status,
            accept: req.header['accept'],
            cookie: req.header['cookie'],
            ua: req.header['user-agent'],
            method: req.method,
            headers: ctx.headers,
            url: req.url,
            client_ip: ip,
            cost: endTime - beginTime,
            input: input
        };

        logger.getLogger('access').trace('requestSuccess', fields);
    } catch (e) {
        if (e.code === 'ECONNREFUSED') {
            //数据库连接失败
            logger.getLogger('error').fatal('mysql连接失败', e.message, e.code);
            e.code = 1;
            e.message = '数据库连接异常';
        }

        if (e.code === 'ER_DUP_ENTRY') {
            logger.getLogger('error').error('mysql操作异常', e.message, e.code);
            e.code = 1;
            e.message = '数据库操作违反唯一约束';
        }

        if (e.code === 'ETIMEDOUT') {
            logger.getLogger('error').error('mysql操作异常', e.message, e.code);
            e.code = 1;
            e.message = '数据库连接超时';
        }


        let req = ctx.request;
        let res = ctx.response;
        let status = e.status || 500;
        let msg = e.message || e;
        let input = ctx.input;

        let endTime = new Date().getTime();
        let ip = req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;

        let fields = {
            status: res.status,
            accept: req.header['accept'],
            cookie: req.header['cookie'],
            ua: req.header['user-agent'],
            method: req.method,
            headers: ctx.headers,
            url: req.url,
            client_ip: ip,
            cost: endTime - beginTime,
            input: input,
            msg: msg
        };

        ctx.status = status;

        if (status === 500) {
            logger.getLogger('access').error('requestError', fields);
        } else {
            logger.getLogger('access').warn('requestException', fields);
        }
        let errCode = e.code || 1;
        if (!(parseInt(errCode) > 0)) {
            errCode = 1;
        }
        return response.output(ctx, {}, errCode, msg, status);

    }
    
};