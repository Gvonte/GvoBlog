// 错误处理中间件
module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.log('捕获到错误：', error);
        const isHttpException = error instanceof global.errors.HttpException;
        if (isHttpException) {
            ctx.body = {
                status: error.code,
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.response.status = error.code;
        } else if (error.message === "Authentication Error") {
            ctx.body = {
                status: 403,
                msg: "token无效，用户无权限",
                error_code: 10006,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.response.status = 403;
        } else {
            // 未知错误
            ctx.body = {
                msg: error.message,
                status: 500,
                error_code: 9999,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.response.status = 500;
        }
    }
}