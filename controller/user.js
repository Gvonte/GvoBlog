const userService = require("../service/user");
const jwt = require("jsonwebtoken");
const secret = require("../utils/tokenSecret");

// 登录
const login = async ctx => {
    const { username, password } = ctx.request.body;
    // 检验数据（用户名、密码）
    if (!username || !password) {
        throw new global.errors.ParameterException("请输入用户名和密码");
    }
    const info = await userService.login({ username, password });
    ctx.response.status = 200;
    ctx.body = global.res.json({
        info,
        token: jwt.sign(
            {
                data: JSON.stringify(info),
                exp: Date.now() + 60 * 24 * 60 * 60 * 1000 //60天后过期
            },
            secret
        )
    })
}
// 注册
const register = async ctx => {
    const { email, username, password } = ctx.request.body;
    // 检验数据（用户名、密码、邮箱）
    if (!email || !username || !password) {
        throw new global.errors.ParameterException("请输入用户名、密码和邮箱");
    }
    if (username.length > 14 || username.length < 6) {
        throw new global.errors.ParameterException("用户名必须在6-14位之间");
    }
    if (password.length > 14 || password.length < 6) {
        throw new global.errors.ParameterException("密码必须在6-14位之间");
    }
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
        throw new global.errors.ParameterException("请输入正确的邮箱格式");
    }
    await userService.register({ email, username, password });
    ctx.response.status = 200;
    ctx.body = global.res.success("注册成功");
}
// 获取用户信息
const getUser = async ctx => {
    ctx.response.status = 200;
    ctx.body = global.res.json(JSON.parse(ctx.state.user.data));
}
module.exports = { login, register, getUser };