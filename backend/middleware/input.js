module.exports = async function (ctx, next) {
    let method = ctx.method;

    switch(method) {
        case 'GET':
            ctx.input = ctx.query;
            break;
        case 'PUT':
        case 'POST':
            ctx.input = ctx.request.body;
            break;
        default:
            ctx.input = {};
            break;
    }
    ctx.type = 'application/json; charset=utf-8';
    await next();
}