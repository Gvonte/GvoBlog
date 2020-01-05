const Sequelize = require("sequelize");
const sequelize = require("./index");
const { INTEGER, STRING, TEXT } = Sequelize;
const Category = require("./category")

const Article = sequelize.define("Article", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(50), allowNull: false },
    author: { type: STRING(30), defaultValue: 'Gvonte' },
    content: { type: TEXT('medium'), allowNull: false },
    description: { type: STRING, allowNull: false },
    keyword: { type: STRING, defaultValue: "" }, // 用;分割
    cover: { type: STRING, defaultValue: "" },
    browse: { type: INTEGER, defaultValue: 0 },
});
Article.belongsTo(Category);
Category.hasMany(Article);
Article.sync();

module.exports = Article;