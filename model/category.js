const Sequelize = require("sequelize");
const sequelize = require("./index");
const { INTEGER, STRING } = Sequelize;

const Category = sequelize.define("Category", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "请输入分类名称" }
        }
    }
});
Category.sync();

module.exports = Category;