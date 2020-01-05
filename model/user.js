const Sequelize = require("sequelize");
const sequelize = require("./index");
const { INTEGER, STRING } = Sequelize;
const encrypt = require("../utils/encrypt");

const User = sequelize.define("User", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, },
    username: {
        type: STRING(64),
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: "请输入用户名" },
            len: [6, 64],
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        set(val) {
            // 加密
            const salt = this.getDataValue("salt");
            const password = encrypt(val, salt);
            this.setDataValue("password", password);
        },
        validate: {
            notNull: { msg: "请输入密码" },
            len: [6, 100],
        }
    },
    email: {
        type: STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: "请输入邮箱" },
            isEmail: true
        }
    },
    salt: {
        type: STRING,
        defaultValue: (Date.now() * Math.random()).toFixed()
    }
});
User.sync();
module.exports = User;