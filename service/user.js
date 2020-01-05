const User = require("../model/user");
const encrypt = require("../utils/encrypt");
// 登录
const login = async payload => {
    // 传入邮箱或用户名
    const { username, password } = payload;
    let user = await User.findOne({ where: { username } });
    if (!user) {
        user = await User.findOne({ where: { email: username } });
    }
    if (!user) {
        throw new global.errors.AuthFailed("用户不存在");
    } else {
        if (encrypt(password, user.salt) !== user.password) {
            throw new global.errors.AuthFailed("密码错误");
        } else {
            // 登录成功，返回用户信息
            return { username: user.username, email: user.email, id: user.id }
        }
    }
}
// 注册
const register = async payload => {
    const u1 = await User.findOne({ where: { email: payload.email } });
    if (u1) {
        throw new global.errors.Existing("邮箱已存在");
    }
    const u2 = await User.findOne({ where: { username: payload.username } });
    if (u2) {
        throw new global.errors.Existing("用户名已存在");
    }
    await User.create(payload);
}

module.exports = { login, register };