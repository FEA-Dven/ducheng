module.exports = async function (ctx, next) {
    ctx.headerInput = ctx.req.headers || {};
    //todo 校验header内容
    await next();
}