const Sequelize = require("sequelize");
const sequelize = require("./index");
const { INTEGER, STRING } = Sequelize;
const Advertise = sequelize.define("Advertise", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, },
    title: {
        type: STRING(64),
        allowNull: false,
        validate: {
            notNull: { msg: "请输入广告名称" }
        }
    },
    link: {
        type: STRING(64),
        allowNull: false,
        validate: {
            notNull: { msg: "请输入URL地址" },
            isUrl: { msg: "请输入正确的URL地址" }
        }
    }
});
Advertise.sync().then(() => {
    Advertise.create({
        title: 'GitHub',
        link: 'https://github.com/Gvonte',
    })
});
module.exports = Advertise;