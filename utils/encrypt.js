// 加密密码
const crypto = require("crypto");
const encrypt = (password, salt) => {
    // 使用sha1加密算法
    const str = `1r5uue7${password}2qf3wzxq6${salt}1s6wo8`;
    return crypto.createHash('sha1').update(str).digest('hex');
}
module.exports = encrypt;