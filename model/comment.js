const Sequelize = require("sequelize");
const sequelize = require("./index");
const { INTEGER, STRING } = Sequelize;
const User = require("./user")
const Article = require("./article")

const Comment = sequelize.define("Comment", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, },
    content: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "请输入评论内容" }
        }
    }
});
Comment.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(Article)
Article.hasMany(Comment);
Comment.sync();

module.exports = Comment;